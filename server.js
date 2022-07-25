// import { createServer } from "http";
const { createServer } = require("http");
// import next from "next";
const next = require("next");
// import routes from "./routes";

const app = next({
  dev: process.env.NODE_ENV !== "production",
});

const routes = require("./routes");
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log("Ready on localhost:3000");
  });
});
