call docker rmi afler/backend
call docker build . -t afler/backend:latest
call docker push afler/backend
REM call docker run --name UNC_BACKEND -d -e DATASOURCE_HOST=192.168.0.107 -p 8082:8081 backend:latest