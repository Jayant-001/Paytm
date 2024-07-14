import jwt from 'jsonwebtoken';
import Response from '../DTOs/response.js'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json(new Response(false, "Authorization token not found", null));
        }

        const token = authHeader.split(' ')[1];
        const data = jwt.verify(token, JWT_SECRET);

        req.userId = data.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(new Response(false, error.message, null));
    }
}

export default authMiddleware;