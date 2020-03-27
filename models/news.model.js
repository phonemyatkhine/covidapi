const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        ID:
        {
            type: Number,
        },
        source: {
            type: String,
        },
        title: {
            type: String,
        },
        url: {
            type: String,
        },
        uploadBy: {
            type: String,
        }
    }, {
    collection: 'news'
});

module.exports = mongoose.model('news', newsSchema)
