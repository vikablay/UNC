call docker rmi backend:latest
call docker build . -t backend:latest
call docker run --name UNC_BACKEND -d -e DATASOURCE_HOST=192.168.0.107 -p 8082:8081 backend:latest