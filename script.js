import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // จำลองผู้ใช้ 100 คน
  duration: '30s', // ภาระต่อเนื่อง 30 วินาที
};

export default function () {
  const randomId = Math.floor(Math.random() * 1000000);
  const payload = JSON.stringify({
    username: `user${randomId}`,
    password: 'pass123'
  });

  const headers = { 'Content-Type': 'application/json' };

  const res = http.post('http://localhost:5000/api/v1/register', payload, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200 || r.status === 201,
    'not 500': (r) => r.status !== 500,
  });

  sleep(1); // พัก 1 วินาที (จำลองการใช้งานจริง)
}
