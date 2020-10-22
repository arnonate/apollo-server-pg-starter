import path from 'path';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres'
  }
);

const models = {
  User: require(path.join(__dirname, './user'))(sequelize, Sequelize.DataTypes), // eslint-disable-line global-require
  Visit: require(path.join(__dirname, './visit'))(sequelize, Sequelize.DataTypes) // eslint-disable-line global-require
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
