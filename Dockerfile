FROM node:12
WORKDIR /app

# install dependencies
RUN yarn global add serve
COPY package.json yarn.lock ./
RUN yarn install

# build the project
COPY . .
RUN yarn run build

ENV PORT=8080
EXPOSE ${PORT}

CMD ["serve", "--single", "serve"]
