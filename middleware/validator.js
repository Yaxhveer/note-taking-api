import { validationResult, body } from "express-validator"

export const validateCreateNote = [

    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map((error) => error.msg)
            return res.status(400).json({ done: false, errors: err });
        }
        next();
    },
];

export const validateUpdateNote = [

    body('title').if(body('title').exists()).notEmpty().withMessage('Title should not be empty'),
    body('content').if(body('content').exists()).notEmpty().withMessage('Content should not be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map((error) => error.msg)
            console.log(errors.array());
            return res.status(400).json({ done: false, errors: err });
        }
        next();
    },
];