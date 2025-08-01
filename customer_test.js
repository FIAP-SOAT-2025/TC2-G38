import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {

  vus: 100,
  duration: '120s',

  // stages: [
  //   { duration: '10s', target: 10 }, // Aumenta para 10 VUs em 10s
  //   { duration: '20s', target: 20 }, // Mantém 20 VUs por 20s
  //   { duration: '10s', target: 0 },  // Diminui para 0 VUs em 10s
  // ],
};

export default function () {
  const url = 'http://localhost:8080/customer/324.449.888-41';
  const params = {
    headers: {
      'Accept': '*/*',
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
