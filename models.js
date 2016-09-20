module.exports = (db) => {
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Schema.Types.ObjectId;

    const postSchema = new mongoose.Schema({
        body: String,
        thread: ObjectId
    });

    postSchema.virtual('created_at').get(function() {
        return this._id.getTimestamp();
    });

    postSchema.set('toObject', { virtuals: true });
    postSchema.set('toJSON', { virtuals: true });

    return {
        post: db.model('Post', postSchema),
        thread: db.model('Thread', new mongoose.Schema({
            title: String
        }))
    }
};
