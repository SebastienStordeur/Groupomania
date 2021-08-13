const { Post } = require('../models/postModel');
const fs = require('fs');

exports.createPost = (req,res,next) => {
  
  const postObject = JSON.parse(req.body.post);
  delete postObject.id;
  const post = new Post({
    ...body.postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
  });
  post.save()
    .then(() => res.status(201).JSON({ message: "Post crée" }))
    .catch(error => res.status(400).JSON({ message: "Impossible de créer ce post" + error }));
}