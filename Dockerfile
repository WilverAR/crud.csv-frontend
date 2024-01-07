FROM node:18.17.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Path: Dockerfile
FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/crud-csv/browser /usr/share/nginx/html
