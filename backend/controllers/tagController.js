const db = require('../models');
const Tag = db.tags;

exports.createTag = (req,res) => {
    const tag = { ...req.body };
    Tag.create(tag)
        .then(() => res.status(201).json({ message: "Tag crée." }) )
        .catch(error => res.status(400).json({ message: "Impossible de créer ce tag. " + error }) );
};

exports.getTags = (req,res) => {
    Tag.findAll({ where: req.body.id })
        .then((data) => res.status(201).json({ data }))
        .catch(error => res.status(500).json({ message: "Rien à afficher. " + error }));
};

exports.deleteTag = (req,res) => {
    Tag.findOne({ where: { id: req.params.id }})
        Tag.destroy({ where: { id: req.params.id }} )
            .then(() => res.status(201).json({ message: "Tag supprimé."}) )
            .catch(error => res.status(400).json({ message: "Impossible de supprimer ce tag. " + error }) );
};