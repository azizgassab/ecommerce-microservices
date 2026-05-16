const grpc = require('@grpc/grpc-js');

const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    './proto/user.proto'
);

const proto = grpc.loadPackageDefinition(packageDefinition).user;

const users = [
    {
        id: 1,
        name: 'Aziz',
        email: 'aziz@gmail.com'
    },
    {
        id: 2,
        name: 'Gadour',
        email: 'gadour@gmail.com'
    }
];

function getUsers(call, callback) {

    callback(null, {
        users
    });

}

const server = new grpc.Server();

server.addService(proto.UserService.service, {
    GetUsers: getUsers
});

server.bindAsync(
    '0.0.0.0:5001',
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log('User gRPC Service running on port 5001');
    }
);