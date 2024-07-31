// authMiddleware.js

require('dotenv').config();

function checkAuth(req, res, next) {

    const authHeader = req.headers['authorization'];
    // const authHeader = req.headers['cache-control'];
    const authToken = process.env.AUTH_TOKEN;
    console.log(authHeader);
    if (authHeader) {
    //   const token = authHeader.split(' ')[1];
    //   console.log(token);
    //   if (token === authToken) {
        if (authHeader === authToken) {
        next();
      } else {
        res.sendStatus(403); // Forbidden
      }
    } else {
      res.sendStatus(401); // Unauthorized
    }
  }
  
  module.exports = checkAuth;
  