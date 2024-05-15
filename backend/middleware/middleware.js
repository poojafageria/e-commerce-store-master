const User = require('../models/User')
const {verifyToken} = require('../utils/utility.function')

const sendResponseError = (statusCode, msg, res) => {
  res.status(statusCode || 400).send(!!msg ? msg : 'Invalid input !!')
}

const verifyUser = async (req, res, next) => {
  const {authorization} = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    sendResponseError(400, 'You are not authorized ', res)
    return;
  }

  try {
    const payload = await verifyToken(authorization.split(' ')[1]);
    if (!payload) {
      sendResponseError(400, 'You are not authorized', res);
      return;
    }
    const user = await User.findById(payload.id, { password: 0 });

    if (!user) {
      sendResponseError(400, 'User not found', res);
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    // console.log('Error ', err)
    sendResponseError(500, `Internal Server Error ${err}`, res)
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    sendResponseError(403, 'Permission denied. Admin access required.', res);
  }
};

const isUser = (req, res, next) => {
  const user = req.user;
  if (user.role === 'user' && req.path !== '/addProduct') {
    next();
  } else if (user.role === 'admin') {
    next();
  } else {
    sendResponseError(403, 'Permission denied.', res);
  }
};

module.exports = {
  sendResponseError,
  verifyUser,
  isAdmin,
  isUser,
}
