module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    lastName: {
      type: Sequelize.STRING(20),
      required: true,
      validate: { len: [3, 20] },
    },
    firstName: {
      type: Sequelize.STRING(20),
      required: true,
      validate: { len: [3, 20] }
    },
    email: {
      type: Sequelize.STRING(40),
      required: true,
      /* validate: { isEmail: true }, */
      unique: true,
    },
    password: {
      type: Sequelize.STRING(64),
      required: true,
      min: 8
    },
    imageUrl: {
      type: Sequelize.STRING(),
      defaultValue: 'http://localhost:5000/images/default_image.jpg'
    },
    bio: {
      type: Sequelize.STRING(300),
      defaultValue: "Bio par défaut",
    },
    job: {
      type: Sequelize.STRING(50),
      defaultValue: "A remplir"
    },
    isAdmin: { 
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
}