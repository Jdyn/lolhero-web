import { createServer } from "http";
import { parse } from "url";
import next from "next";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "client/" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
