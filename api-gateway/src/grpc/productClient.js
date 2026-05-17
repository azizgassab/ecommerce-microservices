const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "../../../proto/product.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(packageDefinition).product;

class ProductClient {
  constructor() {
    this.client = null;
  }

  connect(target) {
    this.client = new productProto.ProductService(
      target,
      grpc.credentials.createInsecure()
    );
    console.log(`Product gRPC client connecting to ${target}`);
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.client.ListProducts({}, (error, response) => {
        if (error) return reject(error);
        resolve(response.products);
      });
    });
  }

  getProduct(id) {
    return new Promise((resolve, reject) => {
      this.client.GetProduct({ id }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  createProduct(name, price) {
    return new Promise((resolve, reject) => {
      this.client.CreateProduct({ name, price }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  updateProduct(id, name, price) {
    return new Promise((resolve, reject) => {
      this.client.UpdateProduct({ id, name, price }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      this.client.DeleteProduct({ id }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }
}

module.exports = new ProductClient();
