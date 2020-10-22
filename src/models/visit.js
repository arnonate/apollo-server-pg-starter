const visit = (sequelize, DataTypes) => {
  const Visit = sequelize.define('visit', {
    note: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A note must contain text'
        }
      }
    }
  });

  Visit.associate = models => {
    Visit.belongsTo(models.User);
  };

  return Visit;
};

export default visit;
module.exports = visit;
