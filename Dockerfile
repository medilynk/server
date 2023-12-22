FROM node:20-alpine

WORKDIR /app
COPY . /app/

RUN npm install
RUN npm install -g pm2

EXPOSE 3000

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]

