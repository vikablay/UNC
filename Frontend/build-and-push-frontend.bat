call docker rmi afler/frontend
call docker build . -t afler/frontend:latest
call docker push afler/frontend
REM call docker run --name UNC_FRONTEND -d -p 4200:80 afler/frontend:latest
