const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const mail = require('../utils/mail');
const User = require('../db/models/user');

const router = express.Router();

const codes = {};
const SECRET = 'helloexpress';
const DURATION = 5; // 5s

router.post('/sendEmailVerificationCode', async (req, res) => {
    const { email } = req.body;
    if (codes[email]) {
        const duration = (Date.now() - codes[email].timestamp) / 1000;
        if (duration <= DURATION) {
            return res.send({
                code: -1,
                message: `${Math.ceil(DURATION - duration)}s后重新发送`
            });
        }
    }

    try {
        // await mail.send(email, '测试邮件');

        codes[email] = {
            timestamp: Date.now(),
            code: String(Math.random()).slice(2, 6)
        };

        console.log(codes);
        res.send({
            code: 0,
            message: '验证码已发送'
        });
    } catch (error) {
        console.log(error);
        res.send({
            code: -1,
            message: '验证码发送失败'
        });
    }
});

router.post(
    '/register',
    [
        body('username').notEmpty(),
        body('password').notEmpty(),
        body('email').isEmail(),
        body('verificationCode').isLength({ min: 4, max: 4 }).withMessage('must be 4 chars long')
    ],
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, email, verificationCode } = req.body;

        try {
            const userExist = await User.findOne({
                username
            });

            if (userExist) {
                return res.send({
                    code: -1,
                    message: '用户名已存在'
                });
            }

            const emailExist = await User.findOne({
                email
            });

            if (emailExist) {
                return res.send({
                    code: -1,
                    message: '邮箱已被使用'
                });
            }

            if (codes[email] !== verificationCode) {
                return res.send({
                    code: -1,
                    message: '验证码错误'
                });
            }

            const user = await User.create({
                username,
                password,
                email
            });

            res.send({
                code: 0,
                message: '注册成功',
                data: user
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
);

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            username
        });

        if (!user) {
            return res.send({
                code: -1,
                message: '用户名不存在'
            });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.send({
                code: -1,
                message: '密码错误'
            });
        }

        const token = jwt.sign(
            {
                id: String(user._id)
            },
            SECRET
        );

        res.send({
            code: '0',
            message: '登录成功',
            data: {
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
