FROM node:18

WORKDIR /usr/app
COPY *.json ./
RUN npm install
COPY ./src ./src

EXPOSE 3000
CMD [ "npm", "start" ]
