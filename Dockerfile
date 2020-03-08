FROM node:10
ARG NODE_APP_INSTANCE
ARG NODE_ENV=production
ARG PORT=3002
ENV NODE_APP_INSTANCE $NODE_APP_INSTANCE
ENV PORT $PORT
ENV NODE_ENV $NODE_ENV
COPY . /app/
WORKDIR /app/backend
RUN yarn --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
  cat npm-debug.log; \
  fi) && false)
RUN yarn build
CMD yarn start
EXPOSE $PORT
