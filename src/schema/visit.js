import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    visits: [Visit!]!
    visit(id: ID!): Visit!
  }

  extend type Mutation {
    createVisit(userId: ID!, note: String!): Visit!
    deleteVisit(id: ID!): Boolean!
  }

  type Visit {
    id: ID!
    note: String!
    user: User!
  }
`;
