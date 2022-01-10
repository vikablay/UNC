FROM node:alpine AS build
WORKDIR /usr/local/app
COPY . .

RUN npm install 
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/local/app/dist/Frontend /usr/share/nginx/html

EXPOSE 80