const db = require('../models');
const Post = db.posts;

exports.createPost = (req,res,next) => {

  const post = {
    title: req.body.title,
    content: req.body.content,
  }

  Post.create(post)
    .then(() => res.status(201).json({ message: "Post crée" }))
    .catch(error => res.status(400).json({ message: "Impossible de créer ce post" + error }));
}

exports.updatePost = (req,res,next) => {
  
}