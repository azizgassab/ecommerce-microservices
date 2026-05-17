const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const User = require("../models/User");

const PROTO_PATH = path.join(__dirname, "../../../proto/user.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const grpcServer = new grpc.Server();

grpcServer.addService(userProto.UserService.service, {
  GetUser: async (call, callback) => {
    try {
      const user = await User.findByPk(call.request.id);
      if (!user) {
        return callback({ code: grpc.status.NOT_FOUND, message: "User not found" });
      }
      callback(null, { id: user.id, name: user.name, email: user.email });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  ListUsers: async (call, callback) => {
    try {
      const users = await User.findAll();
      callback(null, { users: users.map(u => ({ id: u.id, name: u.name, email: u.email })) });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  CreateUser: async (call, callback) => {
    try {
      const { name, email } = call.request;
      const user = await User.create({ name, email });
      callback(null, { id: user.id, name: user.name, email: user.email });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  UpdateUser: async (call, callback) => {
    try {
      const user = await User.findByPk(call.request.id);
      if (!user) {
        return callback({ code: grpc.status.NOT_FOUND, message: "User not found" });
      }
      const { name, email } = call.request;
      await user.update({ name, email });
      callback(null, { id: user.id, name: user.name, email: user.email });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  DeleteUser: async (call, callback) => {
    try {
      const user = await User.findByPk(call.request.id);
      if (!user) {
        return callback({ code: grpc.status.NOT_FOUND, message: "User not found" });
      }
      await user.destroy();
      callback(null, { success: true });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },
});

const startGrpcServer = (port) => {
  const address = `0.0.0.0:${port}`;
  grpcServer.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
      console.error("gRPC server error:", err);
      return;
    }
    console.log(`User gRPC server running on ${address}`);
  });
};

module.exports = { startGrpcServer };
