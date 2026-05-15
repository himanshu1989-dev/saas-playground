const http = require("node:http");

const PORT = 3333;
const server = http.createServer((req, res) => {

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(`Received request: ${req.method} ${req.url}`);

  if (req.url == "/api/health")
  {
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "ok",
      message: "Recipe Assistant backend is running",
    }),
  );
}else{
  res.statusCode = 404;
  res.end(
    JSON.stringify({
      error: "Endpoint not found",
    }),
  );
}
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
