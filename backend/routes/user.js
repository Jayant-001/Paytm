import express from 'express'
import { User } from '../db.js';
import zod from 'zod';
import jwt from 'jsonwebtoken';

const router = express.Router();

const signupSchema = zod.object({
    userName: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(3, { message: "Password should atleast 3 char long" })
})

router.post('/signup', async (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;

    try {

        const { success, error } = signupSchema.safeParse(req.body);

        if (!success) {
            return res.status(401).json({ error: true, errorMessage: error, data: null });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) return res.status(401).json({ error: true, errorMessage: "User name already exists", data: null });

        const user = new User({ firstName, lastName, userName, password })
        user.save();

        const token = jwt.sign({userId: user._id}, JWT_SECRET);

        res.status(201).json({ error: true, errorMessage: "", data: token })
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }

})

router.get('/login', (req, res) => {
    res.send("login url")
})

export default router;