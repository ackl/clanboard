module.exports = function (db) {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var postSchema = new mongoose.Schema({
        body: String,
        thread: ObjectId,
        author: ObjectId,
        image: String,
    });
    postSchema.virtual('created_at').get(function () {
        return this._id.getTimestamp();
    });
    postSchema.set('toObject', { virtuals: true });
    postSchema.set('toJSON', { virtuals: true });

    return {
        posts: db.model('Post', postSchema),
        threads: db.model('Thread', new mongoose.Schema({
            title: String,
            post: ObjectId
        }))
    }
};
