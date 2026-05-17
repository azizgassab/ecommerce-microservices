require('dotenv').config();

const express = require('express');
const cors = require('cors');

const axios = require('axios');

const { graphqlHTTP } = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} = require('graphql');

const app = express();

app.use(cors());

const ProductType = new GraphQLObjectType({
  name: 'Product',

  fields: () => ({
    id: { type: GraphQLInt },

    name: { type: GraphQLString },

    price: { type: GraphQLFloat }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    products: {
      type: new GraphQLList(ProductType),

      resolve: async () => {
        const response = await axios.get(
          process.env.PRODUCT_SERVICE_URL
        );

        return response.data;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GraphQL service running on port ${PORT}`);
});