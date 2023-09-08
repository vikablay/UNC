call docker run --name unc-db -d --restart=always -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=test-api postgres:14
