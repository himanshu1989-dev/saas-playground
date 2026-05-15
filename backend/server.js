import http from "node:http";
import { dishRoute } from "./routes/analyzeDishRoutes.js";

const PORT = 3333;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(`Received request: ${req.method} ${req.url}`);

  if (!dishRoute(req, res)) {
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
