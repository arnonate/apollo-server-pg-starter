import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message
    };
  },
  context: async () => ({ models }),
  introspection: true
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

const createUsersWithVisits = async () => {
  await models.User.create(
    {
      username: 'narnold',
      visits: [
        {
          note: 'Nate looks healthy to me.'
        }
      ]
    },
    {
      include: [models.Visit]
    }
  );

  await models.User.create(
    {
      username: 'mdizon',
      visits: [
        {
          note: 'He may need to go to a hospital.'
        },
        {
          note: 'This case is a mystery to me.'
        }
      ]
    },
    {
      include: [models.Visit]
    }
  );
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithVisits();
  }

  app.listen({ port: process.env.PORT }, () => {
    console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
  });
});
