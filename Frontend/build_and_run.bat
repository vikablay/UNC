call docker build . -t frontend:latest
call docker run -d -e BACKEND_API_URL=192.168.0.107 -p 4210:80 frontend:latest 