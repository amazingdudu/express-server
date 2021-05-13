const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/express-sever', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        useCreateIndex: true
    })
    // .then(() => {
    //     console.log('数据库已连接');
    // })
    // .catch(error => {
    //     console.log(error);
    // });
