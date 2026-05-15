const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const userRoutes = require('./routes/userRoutes');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

async function startServer() {

    const app = express();

    app.use(express.json());

    app.use('/api', userRoutes);

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        path: '/graphql'
    });

    app.get('/', (req, res) => {
        res.send('API Gateway Running');
    });

    app.listen(3000, () => {
        console.log('Gateway running on port 3000');
    });

}

startServer();