FROM node:10
ARG NODE_APP_INSTANCE
ARG NODE_ENV=production
ARG PORT=3000
ENV NODE_APP_INSTANCE $NODE_APP_INSTANCE
ENV PORT $PORT
ENV NODE_ENV $NODE_ENV

RUN pwd

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN ls -halt
RUN yarn -v
RUN NODE_ENV=development yarn
RUN ls -halt
RUN ls ./node_modules/
RUN ls ./node_modules/typescript

# Bundle app source
COPY . /app

RUN ls -halt
RUN yarn build
CMD yarn start
EXPOSE $PORT
