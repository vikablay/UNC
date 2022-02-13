FROM node:alpine AS build

ENV BACKEND_API_HOST="192.168.0.107"
ENV BACKEND_API_PORT="8888"

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build app/dist/Frontend /usr/share/nginx/html
COPY Roboto-Regular.ttf /usr/share/nginx/html/fonts/Roboto-Regular.ttf
