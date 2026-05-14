const http = require('node:http');

const PORT = 3333;
const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify({
        status: "ok",
        message: "Recipe Assistant backend is running"}));
});


server.listen(PORT,"0.0.0.0",() => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});