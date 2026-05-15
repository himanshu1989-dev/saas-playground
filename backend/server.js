const http = require("node:http");
const recipes = require("./data/recipes.json");

const PORT = 3333;
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(`Received request: ${req.method} ${req.url}`);

  if (req.method === "GET" && req.url == "/api/health") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        status: "ok",
        message: "Recipe Assistant backend is running",
      }),
    );
  } else if (req.method === "GET" && req.url === "/api/recipes") {
    for (let i = 0; i < recipes.length; i++) {
      if (req.url.includes(recipes[i].dishId)) {
        res.statusCode = 200;
        res.end(JSON.stringify(recipes[i].ingredients));
        res.end(JSON.stringify(recipes[i].steps));
        return;
      }
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        error: "Route not found",
      }),
    );
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
