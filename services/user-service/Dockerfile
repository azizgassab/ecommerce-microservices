FROM node:20-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 4001
EXPOSE 50051

CMD ["npm", "start"]
