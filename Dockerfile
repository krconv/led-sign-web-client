FROM node:12 as build
WORKDIR /app

# install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# build the project
COPY . .
RUN yarn run build


# build the serving container
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
