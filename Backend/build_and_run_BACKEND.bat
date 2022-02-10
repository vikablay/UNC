call docker rmi backend:latest
REM Don't forget to build like docker build . -t afler/backend:latest
call docker build . -t backend:latest
call docker run --name UNC_BACKEND -d -e DATASOURCE_HOST=192.168.0.107 -p 8082:8081 backend:latest