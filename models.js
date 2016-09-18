module.exports = function (db) {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    return {
        posts: db.model('Post', mongoose.Schema({
            body: String,
            thread: ObjectId,
            author: ObjectId,
            image: String,
            date: Date
        })),
        threads: db.model('Thread', mongoose.Schema({
            title: String,
            post: ObjectId
        }))
    }
};
