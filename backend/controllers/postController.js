const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const fs = require("fs");
/* var session = require('express-session');
const passport = require('passport'); */


//Create a post
exports.createPost = (req,res) => {
  console.log('Blabla')
  console.log(req.user)
    const post = {
      ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    //userId: req.body.userId
    }
  Post.create(post)
    .then(() => res.status(201).json({ message: "Post crée" }))
    .catch(error => res.status(400).json({ message: "Impossible de créer ce post" + error }));
};

exports.deletePost = (req,res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
      })
    });
    Post.destroy({ where: { id: req.params.id } })
      .then(() => res.status(201).json({ message: "Post supprimé."}))
      .catch(error => res.status(400).json({ message: "Impossible de supprimer ce post. " + error}));
};

exports.getAllPost = (req,res) => {
  console.log(req.session)
  Post.findAll({ where: req.body.id })
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: "Rien à afficher. " + error }))
};

exports.getPostWithUserId = (req,res) => {
  Post.findAll({ where: { userId: 1 } })
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: "Rien à afficher" + error }));
};


//Like / dislike
exports.like = (req,res) => {
  switch(req.body.like) {
    case +1:
      Post.update({
        where: { id: req.params.id },
        where: { likes: +1 }
      })
      .then(() => res.status(201).json({ message: "Post Liké." }))
      .catch(error => res.status(500).json({ message: "Impossible de liker. " + error }));
    break;

    case -1: 
      Post.update({
        where: { id: req.paramas.id },
        where: { likes: -1 }
      })
      .then(() => res.status(201).json({ message: "Post disliké." }))
      .catch(error => res.status(500).json({ message: "Impossible de disliker. " + error}));
    break;
  }
};

//Commentaires
exports.createComment = (req,res) => {
  const comment = {
    ...req.body,
    postId: req.body.postId
  };
  Comment.create(comment)
    .then(() => res.status(201).json({ message: "Commentaire crée" }))
    .catch(error => res.status(400).json({ message: "Impossible de créer ce commentaire. " + error }));
};

exports.getComments = (req, res) => {
  console.log(req.body)
  Comment.findAll({ where:  req.body.postId })
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: 'Impossible de récupérer les commentaires. ' + error }));
};

/* exports.deleteComment = (req, res) => {
  Comment.destroy({ where: {id: req.body.postId}}, 
    { where: {commentId: req.params.id } })
    .then(() => res.status(201).json({ message: 'Commentaire supprimé.'}))
    .catch(error => res.status(500).json({ message: 'Impossible de supprimer ce commentaire. ' + error }));
}; */