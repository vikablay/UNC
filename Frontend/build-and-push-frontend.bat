call docker rmi afler/frontend
call docker build . -t afler/frontend:latest
call docker push afler/frontend
call docker run --name unc-frontend -d -p 4200:80 afler/frontend:latest

