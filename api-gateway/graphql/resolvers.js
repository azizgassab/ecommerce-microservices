const client = require('../services/grpcClient');

const resolvers = {

    Query: {

        users: async () => {

            return new Promise((resolve, reject) => {

                client.GetUsers({}, (error, response) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(response.users);
                    }

                });

            });

        }

    }

};

module.exports = resolvers;