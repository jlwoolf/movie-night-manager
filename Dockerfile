FROM node:latest as build

WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:latest as run

WORKDIR /usr/app
COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/build ./build
RUN npm install --omit=dev
ENTRYPOINT [ "node", "build" ]