const express = require('express');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

app.post('/cart/add', (req, res) => {
  res.status(201).json({ ok: true, message: 'Item added to cart' });
});

app.get('/report', (req, res) => {
  const delayMs = 200 + Math.floor(Math.random() * 201);
  setTimeout(() => {
    res.json({ ok: true, delayMs, report: 'Sample report' });
  }, delayMs);
});

app.post('/pay', (req, res) => {
  if (Math.random() < 0.05) {
    return res.status(500).json({ ok: false, message: 'Simulated payment failure' });
  }
  return res.json({ ok: true, message: 'Payment accepted' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Lab 03 API listening at http://localhost:${port}`);
});
