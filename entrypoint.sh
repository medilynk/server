#!/bin/sh

npx prisma generate < <(echo y)
npx prisma migrate deploy
pm2-runtime start index.js --name "medilynk-server" --watch
