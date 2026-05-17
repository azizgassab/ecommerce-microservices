const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const userClient = require("../grpc/userClient");
const productClient = require("../grpc/productClient");
const orderClient = require("../grpc/orderClient");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    stock: { type: GraphQLInt },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLInt },
    productId: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    total: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return await userClient.getUsers();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (_, { id }) => {
        return await userClient.getUser(id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: async () => {
        return await productClient.getProducts();
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (_, { id }) => {
        return await productClient.getProduct(id);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: async () => {
        return await orderClient.getOrders();
      },
    },
    order: {
      type: OrderType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (_, { id }) => {
        return await orderClient.getOrder(id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { name, email }) => {
        return await userClient.createUser(name, email);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (_, { id, name, email }) => {
        return await userClient.updateUser(id, name, email);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { id }) => {
        return await userClient.deleteUser(id);
      },
    },
    createProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: async (_, { name, price }) => {
        return await productClient.createProduct(name, price);
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
      },
      resolve: async (_, { id, name, price }) => {
        return await productClient.updateProduct(id, name, price);
      },
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { id }) => {
        return await productClient.deleteProduct(id);
      },
    },
    createOrder: {
      type: OrderType,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        total: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: async (_, { productId, quantity, total }) => {
        return await orderClient.createOrder(productId, quantity, total);
      },
    },
    updateOrder: {
      type: OrderType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        productId: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        total: { type: GraphQLFloat },
      },
      resolve: async (_, { id, productId, quantity, total }) => {
        return await orderClient.updateOrder(id, productId, quantity, total);
      },
    },
    deleteOrder: {
      type: OrderType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { id }) => {
        return await orderClient.deleteOrder(id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
