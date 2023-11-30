// models/post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  important: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
