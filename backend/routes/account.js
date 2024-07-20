import { Router } from "express";
import { Account, History, PaymentRequest } from "../db.js";
import mongoose from "mongoose";

const router = Router();

router.get("/balance", async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        return res.status(200).json({ balance: account.balance });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.post("/transfer", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
        session
    );

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance." });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid account" });
    }

    // Perform the transfer
    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
    ).session(session);

    // Create transfer history
    await History.create([{ fromId: req.userId, toId: to, amount }], {
        session,
    });

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successfull" });
});

router.get("/history", async (req, res) => {
    try {
        const histories = await History.find({
            $or: [{ fromId: req.userId }, { toId: req.userId }],
        })
            .populate("fromId", "userName firstName lastName") // populate fromId with user details
            .populate("toId", "userName firstName lastName") // populate toId with user details
            .sort({ updatedAt: -1 }) // sort by updatedAt in decreasing order
            .exec();

        return res.json(histories);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
});

router.put("/add", async (req, res) => {
    try {
        if (req.body.amount < 0)
            return res
                .status(402)
                .json({ message: "Amount can't be negative." });

        // Update amount
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: req.body.amount } }
        );

        return res.json({ message: "Amount added to your account." });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
});

// Create a new payment request
router.post("/payment-request", async (req, res) => {
    try {
        const { to, amount } = req.body;

        await PaymentRequest.create({ fromId: req.userId, toId: to, amount });

        return res.json({ message: "Payment request created." });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
});

function isValidStatus(status) {
    if (
        status &&
        (status == "pending" || status == "fulfilled" || status == "rejected")
    )
        return true;
    return false;
}

router.get("/payment-request", async (req, res) => {
    try {
        const { status } = req.query;
        let paymentRequests;
        if (isValidStatus(status)) {
            paymentRequests = await PaymentRequest.find({
                toId: req.userId,
                status,
            })
                .populate("fromId", "userName firstName lastName") // populate fromId with user details
                .sort({ updatedAt: -1 }) // sort by updatedAt in increasing order
                .exec();
        } else {
            paymentRequests = await PaymentRequest.find({ toId: req.userId })
                .populate("fromId", "userName firstName lastName") // populate fromId with user details
                .sort({ updatedAt: -1 }) // sort by updatedAt in increasing order
                .exec();
        }
        return res.json(paymentRequests);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
});

router.post("/payment-request-fulfill", async (req, res) => {
    const { requestId } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Fetch the accounts within the transaction
        const paymentRequest = await PaymentRequest.findById(requestId).session(
            session
        );

        if (
            !paymentRequest ||
            paymentRequest.toId.toString() != req.userId ||
            paymentRequest.status !== "pending"
        ) {
            throw new Error("Invalid payment request");
        }

        const fromAccount = await Account.findOne({
            userId: paymentRequest.fromId,
        }).session(session);

        const toAccount = await Account.findOne({
            userId: paymentRequest.toId,
        }).session(session);

        if (toAccount.balance < paymentRequest.amount) {
            throw new Error("Insufficient balance.");
        }

        fromAccount.balance += paymentRequest.amount;
        toAccount.balance -= paymentRequest.amount;

        await fromAccount.save({ session });
        await toAccount.save({ session });

        await History.create(
            [
                {
                    fromId: paymentRequest.toId,
                    toId: paymentRequest.fromId,
                    amount: paymentRequest.amount,
                },
            ],
            { session }
        );

        paymentRequest.status = "fulfilled";
        await paymentRequest.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({message: "Payment accepted"});
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error.message);
        return res.status(500).json(error.message);
    }
});

router.post("/payment-request-reject", async (req, res) => {

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { requestId } = req.body;
        const paymentRequest = await PaymentRequest.findById(requestId).session(session);

        if (
            !paymentRequest ||
            paymentRequest.toId.toString() != req.userId ||
            paymentRequest.status !== "pending"
        ) {
            throw new Error("Invalid payment request");
        }

        paymentRequest.status = "rejected";
        await paymentRequest.save({session});

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Payment rejected" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
})

export default router;