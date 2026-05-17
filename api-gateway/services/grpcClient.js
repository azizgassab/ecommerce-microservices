const grpc = require('@grpc/grpc-js');

const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    './proto/user.proto'
);

const proto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new proto.UserService(
    'user-service:5001',
    grpc.credentials.createInsecure()
);

module.exports = client;