docker build . -t backend:1.0.0
docker run -d -e DATASOURCE_HOST=192.168.142.113 -p 8081:8081 backend:1.0.0