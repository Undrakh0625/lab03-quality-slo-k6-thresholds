import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  vus: 20,
  duration: '1m',
  thresholds: {
    'http_req_duration{name:cart}': ['p(95)<200'],
    'http_req_failed{name:pay}': ['rate<0.08'],
    checks: ['rate>0.90'],
  },
};

export default function () {
  const cart = http.post(`${BASE_URL}/cart/add`, JSON.stringify({ itemId: 'sku-1' }), {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'cart' },
  });
  check(cart, { 'cart add succeeds': (r) => r.status === 201 });

  const pay = http.post(`${BASE_URL}/pay`, JSON.stringify({ amount: 1000 }), {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'pay' },
  });
  check(pay, { 'payment succeeds': (r) => r.status === 200 });

  const report = http.get(`${BASE_URL}/report`, { tags: { name: 'report' } });
  check(report, { 'report responds successfully': (r) => r.status === 200 });
  sleep(0.1);
}
