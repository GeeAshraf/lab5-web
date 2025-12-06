const express = require('express');
const {
    RetrieveAllUsers,
    CreateUser,
    DeleteUserById,
    UpdateUserById,
    RetrieveUserById
} = require('../controller/UserController');

const protect = require('../middleware/protectRoute');
const restrictTo = require('../middleware/restrictTo');

const UserRouter = express.Router();
UserRouter.use(protect);

UserRouter.use(restrictTo('admin'));

UserRouter.route('/')
    .get(RetrieveAllUsers)
    .post(CreateUser);

UserRouter.route('/:id')
    .get(RetrieveUserById)
    .delete(DeleteUserById)
    .put(UpdateUserById);

module.exports = UserRouter;
