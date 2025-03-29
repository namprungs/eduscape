'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function ItemPage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // ปุ่มตัวเลขบนแป้นพิมพ์
  const keypad = [
    ['1', 'ABC'], ['2', 'DEF'], ['3', 'GHI'],
    ['4', 'JKL'], ['5', 'MNO'], ['6', 'PQR'],
    ['7', 'STU'], ['8', 'VWX'], ['9', 'YZ'],
  ];

  const handleNumberPress = (num: string) => {
    if (password.length < 7) {
      setPassword((prev) => prev + num);
      setError('');
    }
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (password === '1122334') {
      alert('Unlocked!');
      router.back();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="w-screen h-screen bg-[#D1915C] flex items-center justify-center">
      {/* iPad Body */}
      <div className="relative w-[40%] h-[90%] bg-[#f0f0f0] rounded-[30px] shadow-2xl overflow-hidden">
        {/* กล้องด้านบน */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>

        {/* หน้าจอ */}
        <div className="absolute top-8 left-0 w-full h-[90%] bg-gray-600 flex flex-col items-center px-4 pt-8">
          {/* ไอคอนล็อค */}
          <Icon icon="mdi:lock" className="text-white text-xl mb-2" />

          {/* เวลา */}
          <div className="text-white text-3xl font-bold">11:11</div>

          {/* กรอกรหัสผ่าน */}
          <div className="text-white text-lg font-semibold mt-4 mb-2">
            Enter Password
          </div>

          {/* จุดแทนรหัสผ่าน */}
          <div className="flex gap-1 mb-6">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white"
                  style={{ backgroundColor: i < password.length ? '#f0f0f0' : '#6b6b6b' }}
                />
              ))}
          </div>

          {/* ข้อความผิดพลาด */}
          {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

          {/* แป้นตัวเลข */}
          <div className="grid grid-cols-3 gap-4 w-full mt-auto mb-4">
            {keypad.map(([num, letters]) => (
              <button
                key={num}
                onClick={() => handleNumberPress(num)}
                className="aspect-square w-full rounded-full bg-gray-500 hover:bg-gray-400 active:bg-gray-300 transition-colors flex flex-col items-center justify-center"
              >
                <span className="text-white text-2xl font-bold">{num}</span>
                <span className="text-gray-300 text-xs">{letters}</span>
              </button>
            ))}

            {/* ปุ่มลบ */}
            <button
              onClick={handleDelete}
              className="aspect-square w-full rounded-full bg-gray-500 hover:bg-gray-400 active:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <Icon icon="mdi:backspace" className="text-white text-3xl" />
            </button>

            {/* ปุ่ม 0 */}
            <button
              onClick={() => handleNumberPress('0')}
              className="aspect-square w-full rounded-full bg-gray-500 hover:bg-gray-400 active:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <span className="text-white text-2xl font-bold">0</span>
            </button>

            {/* ปุ่มยืนยัน */}
            <button
              onClick={handleSubmit}
              className="aspect-square w-full rounded-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Icon icon="mdi:check" className="text-white text-3xl" />
            </button>
          </div>
        </div>

        {/* ปุ่มย้อนกลับ */}
        <button
          onClick={() => router.back()}
          className="absolute bottom-4 right-4 text-blue-800 hover:text-blue-600 text-3xl transition-colors"
        >
          <Icon icon="mdi:arrow-left" />
        </button>
      </div>
    </div>
  );
}
