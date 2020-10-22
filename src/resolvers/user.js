export default {
  Query: {
    users: async (parent, args, { models }) => {
      const resolved = await models.User.findAll();
      return resolved;
    },
    user: async (parent, { id }, { models }) => {
      const resolved = await models.User.findByPk(id);
      return resolved;
    }
  },

  User: {
    visits: async (user, args, { models }) => {
      const resolved = await models.Visit.findAll({
        where: {
          userId: user.id
        }
      });
      return resolved;
    }
  }
};
