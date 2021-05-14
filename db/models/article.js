const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema(
    {
        title: {
            required: true,
            type: String,
            maxlength: 20,
            minlength: 1
        },
        content: {
            required: true,
            type: String
        }
    },
    {
        timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
    }
);

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
