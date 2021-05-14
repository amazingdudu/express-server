const express = require('express');

const Article = require('../db/models/article');

const router = express.Router();

/**
 * @description 添加文章
 */
router.post('/add', async (req, res, next) => {
    const { title, content } = req.body;

    try {
        const article = await Article.create({
            title,
            content
        });
        console.log(article);
        res.send({
            code: 0,
            message: '添加成功'
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @description 删除文章
 */
router.post('/delete', async (req, res, next) => {
    const { id } = req.body;

    try {
        const article = await Article.findByIdAndDelete(id);
        console.log(article);
        if (article) {
            res.send({
                code: 0,
                message: '删除成功'
            });
        } else {
            res.send({
                code: -1,
                message: '文章不存在'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

/**
 * @description 更新文章
 */
router.post('/update', async (req, res, next) => {
    const { id, title, content } = req.body;

    try {
        const article = await Article.findByIdAndUpdate(id, {
            title,
            content
        });
        console.log(article);
        if (article) {
            res.send({
                code: 0,
                message: '修改成功'
            });
        } else {
            res.send({
                code: -1,
                message: '文章不存在'
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @description 文章详情
 */
router.get('/detail', async (req, res, next) => {
    const { id } = req.query;

    try {
        const article = await Article.findByIdAndUpdate(id);
        console.log(article);

        res.send({
            code: 0,
            message: 'ok',
            data: article
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @description 文章列表
 */
router.get('/list', async (req, res, next) => {
    try {
        const articleList = await Article.find();
        console.log(articleList);
        res.send({
            code: 0,
            message: 'ok',
            data: articleList
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
