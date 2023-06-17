FROM node:latest AS build
WORKDIR /app

COPY . .
RUN npm install --force
RUN npm run build
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/ssm/ /usr/share/nginx/html
EXPOSE 80