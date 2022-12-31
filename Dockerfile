FROM node:19-alpine3.16

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]