module.exports = function (db) {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    return {
        posts: db.model('Post', mongoose.Schema({
            body: String,
            thread: ObjectId
        })),
        threads: db.model('Thread', mongoose.Schema({
            title: String,
            author: ObjectId
        }))
    }
};
