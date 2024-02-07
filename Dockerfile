# Estágio 1 - compilar código typescript
FROM node:slim as builder
WORKDIR /usr/app
COPY package.json .
COPY tsconfig.json .
COPY .env .
COPY src/ src/
RUN yarn install 
RUN yarn build 

# Estágio 2 - copiar código compilado
FROM node:slim
ENV NODE_ENV=production
WORKDIR /usr/app
COPY package.json .
COPY .env .
RUN yarn install --production
COPY --from=builder /usr/app/build ./build
EXPOSE 8088
CMD [ "node", "./build/index.js" ]