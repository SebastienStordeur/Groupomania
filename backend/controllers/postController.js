const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op


//Create a post
exports.createPost = (req,res) => {
  const post = {
    ...req.body
  }

  Post.create(post)
    .then(() => res.status(201).json({ message: "Post crée" }))
    .catch(error => res.status(400).json({ message: "Impossible de créer ce post" + error }));
}

exports.updatePost = (req,res) => {
  Post.update( req.body, {
    where: { id: req.params.id }
  })
    .then(() => res.status(200).json({ message: "Post mis à jour" }))
    .catch( error => res.status(400).json({ message : "Impossible de mettre à jour ce post. " + error }));
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