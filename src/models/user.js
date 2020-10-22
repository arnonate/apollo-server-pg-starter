const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Visit, { onDelete: 'CASCADE' });
  };

  User.findByUsername = async username => {
    let foundUser = await User.findOne({
      where: { username }
    });

    return foundUser;
  };

  return User;
};

export default user;
module.exports = user;
