const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "client/" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/order/success/:id", (req, res) =>
    app.render(req, res, "/order/success", { tracking_id: req.params.id })
  );

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
