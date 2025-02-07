FROM node:lts as build

WORKDIR /usr/local/app

COPY ./package.json /usr/local/app/
COPY ./package-lock.json /usr/local/app/
COPY ./src /usr/local/app/src

RUN npm install
RUN npm run build

FROM node:lts

WORKDIR /usr/local/app
COPY --from=build /usr/local/app/node_modules /usr/local/app/node_modules
COPY --from=build /usr/local/app/dist /usr/local/app/dist

EXPOSE 3000

CMD node dist/index.mjs