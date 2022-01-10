call docker build . -t frontend:latest
call docker run -d -e BACKEND_API_HOST=192.168.0.107 -e BACKEND_API_PORT=8082 -p 4210:80 frontend:latest 