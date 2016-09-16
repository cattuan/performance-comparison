
const http = require('http');

const hostname = 'localhost';
const port = 8888;

const server = http.createServer((req, res) => {  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end("<h2>Hello world!</h2>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
