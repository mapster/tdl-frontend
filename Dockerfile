FROM gcr.io/google-appengine/nodejs

RUN npm install -g express

COPY . /app
WORKDIR /app

RUN yarn install --production=false
RUN yarn run test:lint
RUN yarn build

CMD ["node", "server.js"]
