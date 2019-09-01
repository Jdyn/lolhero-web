const next = require('next');
const { parse } = require('url');
const { createServer } = require('http');
const match = require('path-match');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: true, dir: 'client/' });

const handle = app.getRequestHandler();
const route = match();

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);

    const orderSuccess = route('/order/success/:trackingId')(pathname);
    const accountOrder = route('/account/order/:trackingId')(pathname);
    const guestOrder = route('/track/:trackingId')(pathname);

    if (orderSuccess) {
      app.render(req, res, '/order/success', Object.assign(orderSuccess, query));
      return;
    }

    if (guestOrder) {
      app.render(req, res, '/order/order', Object.assign(guestOrder, query));
      return;
    }

    if (accountOrder) {
      app.render(req, res, '/account/order', Object.assign(accountOrder, query));
      return;
    }

    handle(req, res);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
