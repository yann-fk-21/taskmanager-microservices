const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');

const validateUserData = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long!'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email!')
    .bail()
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error(`Email ${value} already exists!`);
      }
    }),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  },
];

module.exports = { validateUserData };
