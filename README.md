# Deep Email Validation Endpoint

## Demo

https://deep-email-validator.herokuapp.com/

## Docker Hub

https://hub.docker.com/repository/docker/mfbx9da4/validate-email-endpoint

## Frontend Demo

https://codesandbox.io/s/formik-asynchronous-email-validation-example-tl8l8

## Getting Started

```
yarn
yarn dev
```

## Build

```
yarn build
yarn start
```

## Deploy Docker image

```
docker login
docker build . -t mfbx9da4/validate-email-endpoint
# Push to docker hub
docker push mfbx9da4/validate-email-endpoint
docker run -t -p 8080:8080 -e PORT=8080 mfbx9da4/validate-email-endpoint
heroku container:login
# Push to heroku repo
heroku container:push web
heroku container:release web
heroku open
```
