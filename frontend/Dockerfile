FROM node:18-Alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 5173

CMD ["npm" , "run" , "dev"]