const db = require('../models');
const Tag = db.tags;

exports.createTag = (req,res) => {
    const tag = { ...req.body };
    Tag.create(tag)
        .then(() => res.status(201).json({ message: "Tag crée." }) )
        .catch(error => res.status(400).json({ message: "Impossible de créer ce tag. " + error }) );
}