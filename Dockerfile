FROM node:latest AS build

ARG VARIANT=movie
ENV BASE_PATH=/${VARIANT}s
ENV VARIANT=${VARIANT}

WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
RUN if [ "${VARIANT}" = "book" ]; then \
        cp static/book-favicon.png static/favicon.png; \
    fi

RUN npm run build

FROM node:latest AS run

WORKDIR /usr/app
COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/build ./build
RUN npm install --omit=dev
ENTRYPOINT [ "node", "build" ]