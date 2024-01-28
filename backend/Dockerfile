FROM golang:1.21-alpine as build

WORKDIR /app

COPY . ./

RUN apk add --no-cache git

RUN go mod download
RUN go build oss-backend/cmd/api

WORKDIR /

FROM alpine

COPY --from=build /app/api /api
COPY --from=build /app/config.json /config.json
#COPY --from=build /app/static /static

ADD https://github.com/golang/go/raw/master/lib/time/zoneinfo.zip /zoneinfo.zip
ENV ZONEINFO /zoneinfo.zip

ENTRYPOINT ["/api"]
