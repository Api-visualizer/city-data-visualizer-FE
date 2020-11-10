FROM node:12.18.3-alpine

# install simple http server for serving static content
#RUN npm install -g http-server

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8090

# build app for production with minification
CMD [ "npm", "run", "serve" ]

#CMD [ "http-server", "dist", "-a", "0.0.0.0", "-p", "8090"]

