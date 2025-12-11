FROM node:18-alpine

WORKDIR /app

# Accept backend URL from docker-compose during build

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 5173

CMD ["npm" , "run" , "dev"]
