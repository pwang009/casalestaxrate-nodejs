FROM node:lts-alpine AS build
ENV NODE_ENV=production
WORKDIR /usr/app
COPY package.json ./
RUN npm install --production --silent && mv node_modules ../
COPY ./src ./src
# RUN yarn build

# FROM node:lts-alpine
# WORKDIR /usr/app
# COPY --from=build /usr/src/app/dist .
EXPOSE 5000
EXPOSE 5001
USER node
CMD ["node", "src/server.js"]