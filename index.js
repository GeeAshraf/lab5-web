const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const RequestRouter = require('./routes/RequestRouter');
const UserRouter = require('./routes/UserRouter');
const AuthRouter = require('./routes/AuthRouter.js');

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/requests', RequestRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);


module.exports = {app};