// // models/post.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const postSchema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   category: { type: Schema.Types.ObjectId, ref: 'Category' },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   important: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   imageUrl: { type: String },
// });

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  important: { type: Boolean, required: true },
  imgUrl: { type: String }, // Add this line for imgUrl
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;