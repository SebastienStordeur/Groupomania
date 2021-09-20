const db = require('../models');
const Comment = db.comments;

/* exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).json({ message: 'Commentaire supprimé.'}))
    .catch(error => res.status(500).json({ message: 'Impossible de supprimer ce commentaire. ' + error }));
} */