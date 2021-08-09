const http = require('http');
const app = require('./app');



//Routes

//Server
const server = http.createServer(app);

server.listen(process.env.PORT);