const express = require('express');
const {
  createUser,
  retrieveAllUsers,
} = require('../controllersUserController.js');

const { verifyAdmin } = require('../controllers/authcontroller.js'); // import it


const userRouter = express.Router();

// Apply verifyAdmin to all routes in this router
userRouter.use(verifyAdmin)

// All users
userRouter
  .route('/')
  .get(retrieveAllUsers)   // Get all users
  .post(createUser);       // Add new user

module.exports = userRouter;