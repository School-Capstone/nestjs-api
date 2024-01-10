import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // Virtual Users
  duration: '30s', // Duration of the test
};

export default function () {
  const res = http.get('http://localhost:8080/posts'); // Update with your API endpoint
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
