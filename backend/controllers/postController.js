const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Like = db.likes;
const Dislike = db.dislikes;
const fs = require("fs");

//Create a post
exports.createPost = (req,res) => {
    const post = {
      ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    userId: req.body.userId
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
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(201).json({ message: "Post supprimé."}))
          .catch(error => res.status(400).json({ message: "Impossible de supprimer ce post. " + error}));
      });
    })
    .catch(error => res.status(500).json({ message: "Erreur. " + error }));
};

exports.getAllPost = (req,res) => {
  Post.findAll( /* {include:[{ model:Like, required: false}, {model:Dislike, required: false}]} */ { where: req.body.id })
    .then((data) => {
      res.status(201).json({ data })
    }
      )
    .catch(error => res.status(500).json({ message: "Rien à afficher. " + error }))
};

exports.getPostWithUserId = (req,res) => {
  Post.findAll({ where: { userId: req.params.userId } })
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: "Rien à afficher" + error }));
};


//Like / dislike
exports.like = (req, res) => {
  const like = { ...req.body };
  if(Like.userId.includes(req.body.userId)) {
    Like.destroy({ where: { id: req.params.id } })
      .then(() => res.status(201).json({ message: "Like supprimé."}))
      .catch(error => res.status(500).json({ message: "Impossible de supprimer le like. " + error }));
  } else {
    Like.create(like)
      .then(() => res.status(201).json({ message: "Like envoyé."}))
      .catch(error => res.status(500).json({ message: "Impossible d'envoyer le like. " + error}));
  }
};

exports.dislike = (req, res) => {
  const dislike = { ...req.body };
  Dislike.create(dislike)
    .then(() => res.status(201).json({ message: "Dislike envoyé."}))
    .catch(error => res.status(500).json({ message: "Impossible d'envoyer le dislike. " + error })); 
}

//Commentaires
exports.createComment = (req,res) => {
  const comment = {
    ...req.body,
    postId: req.body.postId
  };
  Comment.create(comment)
    .then(() => {
      res.redirect("/posts/:id/comment")
    })
    .catch(error => res.status(400).json({ message: "Impossible de créer ce commentaire. " + error }));
};

exports.getComments = (req, res) => {
  console.log(req.params.id)
  Comment.findAll({ where: { postId: req.params.id }})
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: 'Impossible de récupérer les commentaires. ' + error }));
}; 