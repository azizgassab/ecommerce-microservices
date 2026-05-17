const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "../../../proto/user.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

class UserClient {
  constructor() {
    this.client = null;
  }

  connect(target) {
    this.client = new userProto.UserService(
      target,
      grpc.credentials.createInsecure()
    );
    console.log(`User gRPC client connecting to ${target}`);
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.client.ListUsers({}, (error, response) => {
        if (error) return reject(error);
        resolve(response.users);
      });
    });
  }

  getUser(id) {
    return new Promise((resolve, reject) => {
      this.client.GetUser({ id }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  createUser(name, email) {
    return new Promise((resolve, reject) => {
      this.client.CreateUser({ name, email }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  updateUser(id, name, email) {
    return new Promise((resolve, reject) => {
      this.client.UpdateUser({ id, name, email }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.client.DeleteUser({ id }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }
}

module.exports = new UserClient();
