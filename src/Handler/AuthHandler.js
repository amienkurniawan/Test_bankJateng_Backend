const users = require("../Data/users");
const JWT = require('jsonwebtoken');
const logger = require('../Utility/Logs');

const secretKey = 'test123'; // Kunci rahasia untuk JWT

// get time expired 
function getHours() {
  const expiredJWT = new Date().getTime();
  const oneHoursJWT = expiredJWT + (1 * 60 * 60 * 1000); // 1 hour multiple with 60 minutes, 60 seconds, 1000 milliseconds
  return oneHoursJWT;
}

// Fungsi untuk membuat JWT token
function generateToken(payload) {
  return JWT.sign(payload, secretKey, { expiresIn: getHours() });
}

// fungsi untuk membuat login handler
const authLoginHandler = (request, h) => {
  try {
    const { username, password } = request.payload;

    const index = users.findIndex((user) => user.username === username && user.password === password);

    if (index !== -1) {
      const dataUsername = users[index].username;
      const token = generateToken({ dataUsername });

      const response = h.response({
        status: 'success',
        message: 'login berhasil',
        data: {
          token,
          expiresIn: getHours()
        }
      });

      response.code(200)
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal login. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  } catch (error) {
    logger.error('error message', error)
    const response = h.response({
      status: 'fail',
      message: 'internal server error',
    });
    response.code(500);
    return response;
  }
}

const authLogoutHandler = () => {

}

// fungsi untuk membuat refresh token handler
const authRefreshHandler = (request, h) => {
  const { token } = request.payload;
  try {
    const decoded = JWT.verify(token, secretKey);
    const newToken = generateToken({ username: decoded.username });

    const response = h.response({
      status: 'success',
      message: 'refresh token berhasil',
      data: {
        token: newToken,
        expiresIn: getHours()
      }
    });

    response.code(200)
    return response;

  } catch (error) {
    logger.error('error message', error)
    const response = h.response({
      status: 'fail',
      message: 'Token tidak valid',
    });
    response.code(401);
    return response;
  }
}

module.exports = {
  authLoginHandler,
  authLogoutHandler,
  authRefreshHandler,
}