const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  important: { type: Boolean, required: true },
  imgUrl: { type: String ,default: 'https://th.bing.com/th/id/OIP._wCIR7523U-8chVO6F5XVgHaHa?rs=1&pid=ImgDetMain'},
  pdfUrl: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;