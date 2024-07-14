import express from 'express';
import zod from 'zod'
import { User } from '../db.js';
import Response from '../DTOs/response.js'

const router = express.Router();

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    passwordName: zod.string().optional()
})

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
        return res.status(200).json(new Response(true, null, users));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new Response(true, error.message, null))
    }
})

router.get('/me', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId})
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(new Response(true, error.message, null))
    }
})

export default router;