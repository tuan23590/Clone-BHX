FROM node:21.7.1

WORKDIR /app

COPY package*.json ./

RUN npm uninstall bcrypt

RUN npm install

RUN npm i bcrypt

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]

