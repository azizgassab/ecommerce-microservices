const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "../../../proto/order.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

class OrderClient {
  constructor() {
    this.client = null;
  }

  connect(target) {
    this.client = new orderProto.OrderService(
      target,
      grpc.credentials.createInsecure()
    );
    console.log(`Order gRPC client connecting to ${target}`);
  }

  getOrders() {
    return new Promise((resolve, reject) => {
      this.client.ListOrders({}, (error, response) => {
        if (error) return reject(error);
        resolve(response.orders);
      });
    });
  }

  getOrder(id) {
    return new Promise((resolve, reject) => {
      this.client.GetOrder({ id }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  createOrder(productId, quantity, total) {
    return new Promise((resolve, reject) => {
      this.client.CreateOrder({ productId, quantity, total }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  updateOrder(id, productId, quantity, total) {
    return new Promise((resolve, reject) => {
      this.client.UpdateOrder({ id, productId, quantity, total }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  deleteOrder(id) {
    return new Promise((resolve, reject) => {
      this.client.DeleteOrder({ id }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }
}

module.exports = new OrderClient();
