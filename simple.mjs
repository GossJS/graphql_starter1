import axios from 'axios';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: GraphQLString,
        resolve() {
          return axios.get('https://kodaktor.ru/j/users');
        }
      }
    }
  })
});


const query = '{ users }';

graphql(schema, query).then(({ data }) => {
  console.log(data);
});


//многоэтажная деструктуризация объекта
//всё то же самое что в GraphQL Query, только с двоеточием после me http://graphql.org/learn/
const o = {
  me: {
    name: 'Luke Skywalker'
  }
};

const {
  me: {
    name
  }
} = o;

console.log(name);  //Luke Skywalker
