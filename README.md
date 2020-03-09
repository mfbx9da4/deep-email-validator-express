# Deep Email Validation Endpoint

## Getting Started

```
yarn
yarn build
yarn start
curl -XPOST -d '{"email":"xxx@yyy.zzz"}' -H "Content-type: application/json" http://localhost:8080/email/validate
curl -XPOST -d '{"email":"xxx@yyy.zzz"}' -H "Content-type: application/json" https://rocky-reef-50761.herokuapp.com/email/validate
```

Deploy Docker image

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
