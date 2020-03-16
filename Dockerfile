FROM node:10
ARG NODE_APP_INSTANCE
ARG NODE_ENV=production
ARG PORT=3000
ENV NODE_APP_INSTANCE $NODE_APP_INSTANCE
ENV PORT $PORT
ENV NODE_ENV $NODE_ENV

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn --production=false
RUN cat node_modules/deep-email-validator/package.json

# Bundle app source
COPY . /app

RUN yarn build
CMD yarn start
EXPOSE $PORT
