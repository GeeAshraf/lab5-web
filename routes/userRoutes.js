const express = require('express');
const {
    RetrieveAllUsers,
    CreateUser,
    DeleteUserById,
    UpdateUserById,
    RetrieveUserById
} = require('../controller/UserController');

const UserRouter = express.Router();

UserRouter.route('/')
    .get(RetrieveAllUsers)
    .post(CreateUser);

UserRouter.route('/:id')
    .get(RetrieveUserById)
    .delete(DeleteUserById)
    .put(UpdateUserById);

module.exports = UserRouter;
