import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                throw new Error('Not authorized, token failed');
            }
            req.user = user
            next()
        })

    } catch (err) {
        res.json({ done: false, errors: [err.message] });
    }
    
};