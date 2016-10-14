# node-data-collector server

This application provides a simple websocket interface to a MongoDB database to collect the smartphone wifi information.

## Setup
Make sure you have installed [node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community).
On Windows add MongoDB to the system path if not done already.
To check the data in the MongoDB database [Mongoclient](https://github.com/rsercano/mongoclient) is recommended.

Install all dependencies in the root folder by running:
 ```shell
$ npm install
```

Start MongoDB and automatically create a database in the project data folder (change path accordingly):
 ```shell
$ mongod --dbpath C:\node-data-collector\data
```

## Run

Execute the node server in the root directory with:
 ```shell
$ npm start
```