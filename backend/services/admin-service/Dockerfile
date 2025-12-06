FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Use npm install because there is no package-lock.json yet
RUN npm install

COPY . .

EXPOSE 3007

CMD ["npm", "start"]
