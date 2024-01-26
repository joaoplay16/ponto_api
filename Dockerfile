FROM node:alpine
WORKDIR /usr/app
COPY package.json .
COPY .env .
RUN npm install
COPY src/ src/
ENV NODE_ENV=production
EXPOSE 8088
CMD [ "npm", "start" ]