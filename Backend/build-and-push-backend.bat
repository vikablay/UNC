call docker rmi afler/backend
call docker build . -t afler/backend:latest
call docker push afler/backend
call docker run --name unc-backend -d -e DATASOURCE_HOST=host.docker.internal -p 8082:8081 afler/backend:latest
