const { STRING, VARCHAR } = require('mysql/lib/protocol/constants/types');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("sqlite::memory");

class Post extends Model {}
Post.init(
  {
    id: { //possibilité de le remplacer par l'userid
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    Author: DataTypes.STRING(), 
    content: DataTypes.TEXT(300),
    imageUrl: DataTypes.VARCHAR(),
    
    timestamps: true,
    

  })