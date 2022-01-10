FROM node:alpine AS build
WORKDIR /usr/local/app
COPY . .

RUN npm install

ENV BACKEND_API_HOST="192.168.0.107"
ENV BACKEND_API_PORT="8082"

RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/local/app/dist/Frontend /usr/share/nginx/html

EXPOSE 80
