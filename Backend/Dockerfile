FROM alpine:3.15 AS build

RUN apk add openjdk11
COPY target/Backend-2.6.0.jar /Backend.jar

ENTRYPOINT ["java", "-jar", "/Backend.jar"]