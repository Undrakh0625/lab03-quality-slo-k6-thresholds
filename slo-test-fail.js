import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    'http_req_duration{name:report}': ['p(95)<100'],
  },
};

export default function () {
  const response = http.get(`${BASE_URL}/report`, { tags: { name: 'report' } });
  check(response, { 'report responds successfully': (r) => r.status === 200 });
}
