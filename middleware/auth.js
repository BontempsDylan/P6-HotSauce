require('dotenv').config();
const jwt = require('jsonwebtoken');
const { sendServerErrorResponse, sendUnauthorizedResponse } = require('../error-handlers');

/*
* Objectif => créate the authenticator with the token 
*/

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch(error) {
    console.error(error);
    // if res.status is 401 return error.
    sendUnauthorizedResponse(res);
  }
};