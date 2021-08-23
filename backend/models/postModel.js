/* const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("sqlite::memory");

class Post extends Model {}
Post.init(
  {
    id: { //possibilité de le remplacer par l'userid
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    Author: DataTypes.STRING(),         //nom et prénom de celui qui post
    content: DataTypes.TEXT(300),       //texte du poste
    imageUrl: DataTypes.STRING(),       //image additionnelle non requise
    likes: DataTypes.NUMBER(),
    dislikes: DataTypes.NUMBER(),
/*     userLikes: DataTypes.ARRAY(),
    userDislikes: DataTypes.ARRAY() */
/*   },    
  {
    sequelize,
    timestamps: true,
    updatedAt: 'updateTimeStamp',
    modelName: "Post",
    tableName: "posts"
  }  
);

Post.sync();

module.exports = { Post }; */ 