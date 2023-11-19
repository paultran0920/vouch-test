FROM node:18

WORKDIR /usr/app
COPY *.json ./
RUN npm install --force
COPY ./src ./src
COPY ./public ./public

EXPOSE 3000
CMD [ "npm", "start" ]
