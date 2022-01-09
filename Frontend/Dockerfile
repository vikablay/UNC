FROM node:17-alpine AS build
WORKDIR /usr/local/app
COPY ./ /usr/local/app

RUN npm install 
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/local/app/dist/Frontend /usr/share/nginx/html

EXPOSE 80