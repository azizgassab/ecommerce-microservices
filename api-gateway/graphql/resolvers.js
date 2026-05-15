const resolvers = {

    Query: {

        users: () => {
            return [
                {
                    id: 1,
                    name: "Aziz",
                    email: "aziz@gmail.com"
                },
                {
                    id: 2,
                    name: "Gadour",
                    email: "gadour@gmail.com"
                }
            ];
        }

    }

};

module.exports = resolvers;