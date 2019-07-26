const next = require("next");
const { parse } = require("url");
const { createServer } = require("http");
const match = require("path-match");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev, dir: "client/" });

const handle = app.getRequestHandler();
const route = match();

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);

    const params = route("/order/success/:tracking_id")(pathname);

    if (params) {
      app.render(req, res, "/order/success", Object.assign(params, query));
      return;
    }

    handle(req, res);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
