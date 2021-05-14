const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
require('./db/connect');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/user', userRouter);
app.use('/article', articleRouter);

app.use((req, res, next) => {
    // next(createError(404));
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    res.status(err.status || 500);
    res.send('Server Error');
});

module.exports = app;
