FROM node:14.15.0-alpine3.12 as builder
WORKDIR /tmp
RUN npm config set registry https://registry.npm.taobao.org
COPY ./front/package*.json ./
RUN npm install
COPY ./front .
RUN npm run build

FROM node:14.15.0-alpine3.12 as app
WORKDIR /home
RUN npm config set registry https://registry.npm.taobao.org
COPY package*.json ./
RUN npm ci --only=production
COPY . .
COPY --from=builder /tmp/dist ./dist
CMD [ "npm","start" ]