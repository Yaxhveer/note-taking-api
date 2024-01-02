import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: user.name,
            });
        } else {
            res.status(401);
            throw new Error('Invalid name or password');
        }
    } catch (err) {
        res.json({ done: false, errors: [err.message] });
    }
    
};

// @desc    Register a new user
// @route   POST /register
// @access  Public
export const registerUser = async (req, res) => {

    try {
        const { name, password } = req.body;

        const userExists = await User.findOne({ name });

        if (userExists) {
            generateToken(res, userExists._id);

            res.status(200).json({
                _id: userExists._id,
                name: userExists.name,
            }); 
            return;
        }

        const user = await User.create({
            name,
            password,
        });

        if (user) {
            generateToken(res, user._id);

            res.status(200).json({
                _id: user._id,
                name: user.name,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (err) {
        res.json({done: false, errors: [err.message]});
    }
};

// @desc    Logout user / clear cookie
// @route   POST /user/logout
// @access  Private
export const logoutUser = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};