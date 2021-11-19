const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Like = db.likes;
const { Op } = require("sequelize");
const fs = require("fs");

//Create a post
exports.createPost = (req,res) => {
  console.log(req.body)
    const post = {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      tags: req.body.tags.split(',').join(" ").toString(),
      like: 0,
      dislike: 0,
      userId: req.body.userId
    }
  Post.create(post)
    .then(() => res.status(201).json({ message: "Post crée" }) )
    .catch(error => res.status(400).json({ message: "Impossible de créer ce post. " + error }));
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
  Post.findAll({ where: req.body.id , include:User })
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: "Rien à afficher. " + error }))
};

exports.getPostWithUserId = (req,res) => {
  Post.findAll({ where: { userId: req.params.id }, include:User })
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: "Rien à afficher" + error }));
};

//Commentaires
exports.createComment = (req,res) => {
  const comment = {
    ...req.body,
    postId: req.body.postId
  };
  Comment.create(comment)
    .then(() => res.redirect("/posts/:id/comment"))
    .catch(error => res.status(400).json({ message: "Impossible de créer ce commentaire. " + error }));
};

exports.getComments = (req, res) => {
  Comment.findAll({ where: { postId: req.params.id }, include:User})
    .then((data) => res.status(201).json({ data }))
    .catch(error => res.status(500).json({ message: 'Impossible de récupérer les commentaires. ' + error }));
};

exports.likeManagement = (req, res) => {
  Like.findOne({ where: { postId: req.body.postId, userId: req.body.userId } })
    .then((response) => {
      //If user has no like/no dislike
      if(response === null) {
        if(req.body.like === 1) { //Like case
          Like.create({ hasLiked: req.body.like, postId: req.body.postId, userId: req.body.userId });
          Post.increment({ like: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: "Like envoyé et pris en compte." });
        }
        else if (req.body.like === -1) { //Dislike case
          Like.create({ hasLiked: req.body.like, postId: req.body.postId, userId: req.body.userId });
          Post.increment({ dislike: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: "Dislike envoyé et pris en compte." });
        };
      }

      //If user has already liked
      else if(response.hasLiked === 1) {
        if(req.body.like === -1) {  //dislike
        Like.update({ hasLiked: -1 }, {where: { [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }] }});
        Post.decrement({ like: 1 }, { where: { id: req.body.postId } });
        Post.increment({ dislike: 1 }, { where: { id: req.body.postId } });
        res.status(201).json({ message: "Like supprimé, dislike ajouté."});
        }
        else {  //like
          Like.destroy({ where: { [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }]}});
          Post.decrement({ like: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: "Like supprimé."});
        };
      }

      //If user has already disliked
      else if(response.hasLiked === -1) {
        if(req.body.like === 1) { //Like
          Like.update({ hasLiked: 1 }, {where: { [Op.and]: [{ postId: req.body.postId }, {userId: req.body.userId }] }});
          Post.decrement({ dislike: 1 }, { where: { id: req.body.postId } });
          Post.increment({ like: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: "Dislike supprimé, like ajouté." });
        }
        else { //Dislike
          Like.destroy({ where: { [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }] }});
          Post.decrement({ dislike: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: "Dislike supprimé."});
        }
      }
    })
    .catch( error => res.status(500).json({ message: "Erreur. " + error }))
} 

//FilterByTag

exports.filterByTag = (req, res) => {
  Post.findAll({ where : { tag: req.params}})
    .then((data) => res.status(201).json(data))
    .catch(error => res.status(400).json({ message: "Impossible de trouver ces posts. " + error }));
}