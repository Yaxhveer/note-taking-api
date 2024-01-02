import jwt from 'jsonwebtoken';

// verify the jwt token
export const verifyToken = async (req, res, next) => {
    try {
        // retrieve the token from cookies
        const token = req.cookies.token;

        // return error if token does not exist
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }

        // verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // return error if token is invalid
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