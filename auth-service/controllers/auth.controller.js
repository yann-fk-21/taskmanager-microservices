const Auth = require('../models/auth.model');
const {
  getUserByEmail,
  createUser,
  comparePasswords,
} = require('../utils/utils');
const { status } = require('http-status');
const jwt = require('jsonwebtoken');

const getServiceErrorStatus = (error) => {
  if (
    [status.BAD_REQUEST, status.CONFLICT, status.UNPROCESSABLE_ENTITY].includes(
      error.statusCode,
    )
  ) {
    return error.statusCode;
  }

  return error.statusCode === status.BAD_GATEWAY
    ? status.BAD_GATEWAY
    : status.INTERNAL_SERVER_ERROR;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user || !password) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }

    const authData = new Auth({ user_id: user._id });
    const token = await authData.generateTokenAndSave();
    return res.status(status.OK).json({ message: 'Login successful', token });
  } catch (error) {
    return res
      .status(getServiceErrorStatus(error))
      .json({ message: 'Error logging in', error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(status.CONFLICT).json({ error: 'User already exists' });
    }

    const newUser = await createUser({ username, email, password });
    if (!newUser) {
      return res
        .status(status.BAD_GATEWAY)
        .json({ error: 'User service returned no user' });
    }

    const { password: _password, ...publicUser } = newUser;
    return res.status(status.CREATED).json(publicUser);
  } catch (error) {
    return res
      .status(getServiceErrorStatus(error))
      .json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const authorization = req.get('authorization');
  const match = authorization && authorization.match(/^Bearer\s+(\S+)$/i);
  if (!match) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ error: 'A Bearer token is required' });
  }

<<<<<<< HEAD
=======
  const token = match[1];
  const existingAuth = await Auth.findOne({ token }).exec();
  if (!existingAuth) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ error: 'Invalid or expired token', is_valid: false });
  }

>>>>>>> 1c3b474 (feat: add api gateway)
  try {
    jwt.verify(match[1], process.env.JWT_SECRET);
    return res
      .status(status.OK)
      .json({ message: 'Token is valid', is_valid: true });
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ error: 'Invalid or expired token', is_valid: false });
    }

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  verifyToken,
};
