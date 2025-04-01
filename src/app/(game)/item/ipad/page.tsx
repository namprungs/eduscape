'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

export default function ItemPage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [isLock, setIsLock] = useState<boolean>(true);

  useEffect(() => {
    if(password == '6142772') {
      setIsLock(false);
    }
  },[password]);

  useEffect(() => {
    setPassword(''); // รีเซ็ต password ทุกครั้งที่เข้าหน้านี้
  },[]);

  // ปุ่มตัวเลขบนแป้นพิมพ์
  const keypad = [
    ['1', 'ABC'], ['2', 'DEF'], ['3', 'GHI'],
    ['4', 'JKL'], ['5', 'MNO'], ['6', 'PQR'],
    ['7', 'STU'], ['8', 'VWX'], ['9', 'YZ'],
  ];

  const handleNumberPress = (num: string) => {
      if(password.length >= 8) return; // จำกัดความยาว password ที่ 8 ตัวอักษร
      setPassword((prev) => prev + num);
  };

  const handleBack = () => {
    router.back(); // กลับไปหน้าก่อนหน้า

  }

  // สร้าง string ของ * ตามความยาวของ password
  const displayPassword = '*'.repeat(password.length);

  return (
    <div className="w-screen h-screen bg-[#D1915C] flex items-center justify-center">
      {/* iPad Body */}
      <div className='bg-white w-[35%] h-[90%] rounded-[50px] grid grid-rows-10'>
        <div className=' w-full flex justify-center items-center'>
          <div className=' w-6 aspect-square bg-black rounded-full' />
        </div>
        <div className='bg-[#7f8283] w-[full] row-span-8 grid grid-rows-12 gap-4 p-4 mx-4'>
          {isLock ? (
            <>
            <div className=' row-span-3 flex flex-col justify-center items-center' >
            <Icon icon="clarity:lock-solid" width="30" height="30" color='white' />
            <h1 className='text-8xl text-white font-serif font-bold'>11:11</h1>
          </div>
          <div className='row-span-2 flex flex-col justify-center items-center' >
            <h1 className='text-4xl text-white'>Enter Password</h1>
            <div className='font-sans text-7xl'>{displayPassword}</div> {/* แสดง * ตามจำนวนตัวอักษร */}
          </div>
          <div className="row-span-7 grid grid-cols-3 grid-rows-3 gap-2 p-2">
            {keypad.map(([num, letters]) => (
              <div key={num} className="flex justify-center items-center">
                <button
                  onClick={() => handleNumberPress(num)}
                  className="flex flex-col justify-center items-center hover:bg-gray-500 active:bg-[#5b5f61] transition-colors rounded-full w-1/2 aspect-square bg-[#5b5f61]"
                >
                  <span className="text-white text-3xl font-bold">{num}</span>
                  <span className="text-gray-300 text-3xl">{letters}</span> {/* ลดขนาดตัวอักษรจาก text-3xl เป็น text-xs */}
                </button>
              </div>
            ))}
          </div>
            </>
          ):(
            <>
            <div className='font-sans font-bold row-span-12 flex flex-col justify-center items-center' >
              <h1 className='text-4xl'>The Code is</h1>
              <h1 className='text-8xl'>57</h1>
            </div>
            </>
          )}
        </div>
        <div className='w-full flex justify-center items-center'>
          <div className='w-12 aspect-square bg-black rounded-full' />
        </div>
      </div>
      <button
          onClick={handleBack}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors text-xl font-bold z-10"
          aria-label="Back"
        >
          ×
        </button>
    </div>
  );
}