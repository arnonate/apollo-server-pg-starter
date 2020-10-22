export default {
  Query: {
    visits: async (parent, args, { models }) => {
      const resolved = await models.Visit.findAll();
      return resolved;
    },
    visit: async (parent, { id }, { models }) => {
      const resolved = await models.Visit.findByPk(id);
      return resolved;
    }
  },

  Mutation: {
    createVisit: async (parent, { userId, note }, { models }) => {
      try {
        const resolved = await models.Visit.create({
          note,
          userId
        });
        return resolved;
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteVisit: async (parent, { id }, { models }) => {
      try {
        const resolved = await models.Visit.destroy({ where: { id } });
        return resolved;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  Visit: {
    user: async (visit, args, { models }) => {
      const resolved = models.User.findByPk(visit.userId);
      return resolved;
    }
  }
};
