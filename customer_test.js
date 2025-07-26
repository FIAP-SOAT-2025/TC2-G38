import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Define o número de usuários virtuais (VUs) e a duração do teste
  vus: 100, // 10 usuários virtuais
  duration: '60s', // Duração do teste de 30 segundos

  // Você pode adicionar estágios para simular diferentes cargas ao longo do tempo
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

  // Verifica se a requisição foi bem-sucedida (status 200)
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Pausa para simular um comportamento mais realista do usuário
  sleep(1); // Espera 1 segundo entre as requisições
}
