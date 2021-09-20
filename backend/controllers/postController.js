const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Op = db.Sequelize.Op
const fs = require("fs")


//Create a post
exports.createPost = (req,res) => {
  console.log(req.body)
    const post = {
      ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    userId: req.body.userId
    }
  //Post.setUser(User.id)
  Post.create(post)
    .then(() => res.status(201).json({ message: "Post crée" }))
    .catch(error => res.status(400).json({ message: "Impossible de créer ce post" + error }));
}

exports.deletePost = (req,res) => {
  Post.destroy({
    where: { id: req.params.id }
  })
    .then(() => res.status(201).json({ message: "Post supprimé."}))
    .catch(error => res.status(400).json({ message: "Impossible de supprimer ce post. " + error}));
}

exports.getAllPost = (req,res) => {
  Post.findAll({ where: req.body.title }) //condition possède un titre
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: "Rien à afficher. " + error }))
}

exports.getPostWithUserId = (req,res) => {
  Post.findAll({ where: { userId: 1 } })
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: "Rien à afficher" + error }));
}


//Like / dislike
 exports.likePost = (req,res) => {
  Post.findOne({ where: {id: req.post.id } })
    switch (req.body.like) {
      case +1: 
      Post.updateOne(
       {where: { postId: req.body.postId }},

      )
        .then(() => res.status(201).json({ message: 'Like envoyé.'}))
        .catch(error => res.status(400).json({ error }));
    }
} 



//Commentaires

exports.createComment = (req,res) => {
  console.log(req.body);
  const comment = {
    ...req.body,
    postId: req.body.postId
  };
  Comment.create(comment)
    .then(() => res.status(201).json({ message: "Commentaire crée" }))
    .catch(error => res.status(400).json({ message: "Impossible de créer ce commentaire. " + error }));
}

exports.getComments = (req, res) => {
  console.log(req.body)
  Comment.findAll({ where:  {id: req.body.postId }})
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: 'Impossible de récupérer les commentaires. ' + error }));
}

/* exports.deleteComment = (req, res) => {
  Comment.destroy({ where: {id: req.body.postId} && {commentId: req.params.id} })
    .then(() => res.status(201).json({ message: 'Commentaire supprimé.'}))
    .catch(error => res.status(500).json({ message: 'Impossible de supprimer ce commentaire. ' + error }));
} */