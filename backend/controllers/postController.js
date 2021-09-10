const db = require('../models');
const Post = db.posts;
const Comment = db.comments;
const Op = db.Sequelize.Op


//Create a post
exports.createPost = (req,res) => {
/*   const postObject = JSON.parse(req.body.post);
  delete postObject.id; */
  const post = {
    ...req.body,
    /* imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, */
    likes: 0,
    dislikes: 0,
  }

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

exports.likePost = (req,res) => {
  Post.findOne({ where: {id: req.params.id } })
    .then(() => res.status(200).json({ message : 'ok'}))
    .catch(error => res.status(400).json({message: "Impossible d'apporter un changement. " + error}))
}

exports.comments = (req,res) => {

}