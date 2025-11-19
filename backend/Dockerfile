FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Start in dev mode with nodemon
CMD ["npm", "run", "dev"]