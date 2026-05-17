FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild sqlite3 --build-from-source
EXPOSE 3002        
CMD ["npm", "run", "dev"]