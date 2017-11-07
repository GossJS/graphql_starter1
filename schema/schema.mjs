import graphql from 'graphql';

import { User } from '../bd/mongoconn.mjs';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      async resolve(parentValue, args) {
         const result = await User.findOne({ username: args.username });
         return result;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export { schema };
