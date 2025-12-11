FROM node:18-alpine

WORKDIR /app

# Accept backend URL from docker-compose during build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 5173

CMD ["npm" , "run" , "dev"]
