FROM node
WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY . .
RUN npm install --save
RUN npm install -g nodemon 
CMD nodemon index.js