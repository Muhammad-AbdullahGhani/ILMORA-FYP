FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Use npm install
RUN npm install

COPY . .

EXPOSE 3006

CMD ["npm", "start"]
