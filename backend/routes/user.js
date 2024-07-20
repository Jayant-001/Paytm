import express from 'express';
import zod from 'zod'
import { Account, User } from '../db.js';
import Response from '../DTOs/response.js'

const router = express.Router();

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    passwordName: zod.string().optional()
})

// update user data
router.put('/', async (req, res) => {

    try {
        const { success, error } = updateSchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ error: true, errorMessage: error, data: null });
        }

        const { firstName, lastName, password } = req.body;

        await User.findOneAndUpdate({ _id: req.userId }, { firstName, lastName, password });

        return res.status(200).json({ error: false, errorMessage: null, data: "User updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(new Response(false, error.message, null))
    }
});

// Get user by Id
router.get('/getById/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ _id: userId })
        return res.status(200).json(new Response(true, null, user));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new Response(true, error.message, null))
    }
})

// Get all users based on filter
router.get("/", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }]
        });
        // return res.status(200).json(new Response(true, null, users));
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json(new Response(true, error.message, null))
    }
})

// Return current user's data
router.get('/me', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId})
        const account = await Account.findOne({ userId: req.userId });
        return res.status(200).json({_id: user._id, firstName: user.firstName, lastName: user.lastName, userName: user.userName, balance: account.balance});
    } catch (error) {
        return res.status(500).json(new Response(true, error.message, null))
    }
})

export default router;