const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const Product = require("../models/Product");

const PROTO_PATH = path.join(__dirname, "../../../proto/product.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(packageDefinition).product;

const grpcServer = new grpc.Server();

grpcServer.addService(productProto.ProductService.service, {
  GetProduct: async (call, callback) => {
    try {
      const product = await Product.findByPk(call.request.id);
      if (!product) {
        return callback({ code: grpc.status.NOT_FOUND, message: "Product not found" });
      }
      callback(null, { id: product.id, name: product.name, price: product.price });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  ListProducts: async (call, callback) => {
    try {
      const products = await Product.findAll();
      callback(null, {
        products: products.map(p => ({ id: p.id, name: p.name, price: p.price }))
      });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  CreateProduct: async (call, callback) => {
    try {
      const { name, price } = call.request;
      const product = await Product.create({ name, price });
      callback(null, { id: product.id, name: product.name, price: product.price });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  UpdateProduct: async (call, callback) => {
    try {
      const product = await Product.findByPk(call.request.id);
      if (!product) {
        return callback({ code: grpc.status.NOT_FOUND, message: "Product not found" });
      }
      const { name, price } = call.request;
      await product.update({ name, price });
      callback(null, { id: product.id, name: product.name, price: product.price });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: error.message });
    }
  },

  DeleteProduct: async (call, callback) => {
    try {
      const product = await Product.findByPk(call.request.id);
      if (!product) {
        return callback({ code: grpc.status.NOT_FOUND, message: "Product not found" });
      }
      await product.destroy();
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
      console.error("Product gRPC server error:", err);
      return;
    }
    grpcServer.start();
    console.log(`Product gRPC server running on ${address}`);
  });
};

module.exports = { startGrpcServer };
