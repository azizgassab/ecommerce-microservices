FROM node:20-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4001
EXPOSE 50051

CMD ["npm", "run", "dev"]
