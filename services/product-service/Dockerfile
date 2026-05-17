FROM node:20-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 3001

CMD ["npm", "start"]