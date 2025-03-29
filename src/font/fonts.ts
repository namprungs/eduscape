import { Jersey_10 } from 'next/font/google';

// โหลด font Jersey 10 จาก Google Fonts
export const jersey10 = Jersey_10({
  weight: '400', // Jersey 10 มี weight เดียวคือ 400
  subsets: ['latin'], // รองรับภาษา Latin
  display: 'swap', // ป้องกันการกระพริบของ font
});