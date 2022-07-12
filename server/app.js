const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// db connection
const db = require('./configs/db.config');

// cors
const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:3000',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const indexRouter = require('./routes/index');
const feedRouter = require('./routes/feed');
const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user_info');
const saveUserRouter = require('./routes/save_user');

const app = express();

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter());
app.use('/feed', feedRouter(db));
app.use('/profile', profileRouter(db));
app.use('/login', loginRouter(db));
app.use('/user', userRouter());
app.use('/save_user', saveUserRouter(db));

module.exports = app;
