const http = require('node:http');

const PORT = 3333;
const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World');
})


server.listen(PORT,"0.0.0.0",() => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});