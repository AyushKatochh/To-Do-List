FROM  node:19

COPY . .
RUN npm install
RUN npm i typescript

# RUN tsc
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/server.js" ]




