const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const Order = require("../models/order");
const db = require("../config/db");

const PROTO_PATH = path.join(__dirname, "../../../proto/order.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

const grpcServer = new grpc.Server();

grpcServer.addService(orderProto.OrderService.service, {
  GetOrder: async (call, callback) => {
    try {
      const order = await Order.findById(call.request.id);
      if (!order) {
        return callback({ code: grpc.status.NOT_FOUND, message: "Order not found" });
      }
      callback(null, order);
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  ListOrders: async (call, callback) => {
    try {
      const orders = await Order.findAll();
      callback(null, { orders });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  CreateOrder: async (call, callback) => {
    try {
      const { productId, quantity, total } = call.request;
      const order = await Order.create({ productId, quantity, total });
      callback(null, order);
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  UpdateOrder: async (call, callback) => {
    try {
      const order = await Order.findById(call.request.id);
      if (!order) {
        return callback({ code: grpc.status.NOT_FOUND, message: "Order not found" });
      }
      const { productId, quantity, total } = call.request;
      const updated = await new Promise((resolve, reject) => {
        db.run(
          "UPDATE orders SET productId = ?, quantity = ?, total = ? WHERE id = ?",
          [productId, quantity, total, call.request.id],
          function (err) {
            if (err) return reject(err);
            resolve({ id: call.request.id, productId, quantity, total });
          }
        );
      });
      callback(null, updated);
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  DeleteOrder: async (call, callback) => {
    try {
      const order = await Order.findById(call.request.id);
      if (!order) {
        return callback({ code: grpc.status.NOT_FOUND, message: "Order not found" });
      }
      await new Promise((resolve, reject) => {
        db.run("DELETE FROM orders WHERE id = ?", [call.request.id], function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
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
      console.error("Order gRPC server error:", err);
      return;
    }
    grpcServer.start();
    console.log(`Order gRPC server running on ${address}`);
  });
};

module.exports = { startGrpcServer };
