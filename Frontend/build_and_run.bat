call docker rmi frontend:latest
call docker build . -t frontend:latest
call docker run -d -p 4210:80 frontend:latest
