import { Router } from "express";
import { Account } from "../db.js"
import mongoose from "mongoose";

const router = Router();

router.get('/balance', async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        return res.status(200).json({ balance: account.balance });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.post('/transfer', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

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
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successfull" });
})

export default router;