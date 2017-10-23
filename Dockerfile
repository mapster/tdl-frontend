FROM gcr.io/google-appengine/nodejs

RUN npm install -g http-server

COPY . /app
WORKDIR /app

RUN yarn install --production=false
RUN yarn run test:lint
RUN yarn build

CMD ["http-server", "build"]
