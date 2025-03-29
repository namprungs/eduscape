'use client'
import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { interactiveMap } from '@/data/InteractiveItems';
import WinModal from '@/component/WinModal';
import LoseModal from '@/component/LoseModal';

export default function PuzzleRoom() {
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ใช้ข้อมูลจาก interactiveMap['room'] เป็นฉากเริ่มต้น
  const roomItems = interactiveMap['room'];

  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const clickedItem = roomItems.find(item => {
      const { x, y, width, height } = item.clickArea;
      return (
        clickX >= x &&
        clickX <= x + width &&
        clickY >= y &&
        clickY <= y + height
      );
    });

    if (clickedItem) {
      const { x, y, width, height } = clickedItem.clickArea;
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      // ซูมก่อน
      setZoomStyle({
        transformOrigin: `${centerX}% ${centerY}%`,
        transform: 'scale(1.5)',
      });
      setIsZooming(true);

      // หลังจากซูม 500ms ค่อยเปลี่ยนหน้า
      setTimeout(() => {
        router.push(`/item/${clickedItem.id}?item=${clickedItem.id}`);
      }, 500);
    }
  }, [router,roomItems]);

  return (
    <div className="w-screen h-screen bg-gray-900 overflow-hidden cursor-pointer">
      <div className="relative w-full h-full">
        <div
          ref={containerRef}
          className="relative w-full h-full select-none transition-transform duration-500"
          style={zoomStyle}
          onClick={handleBackgroundClick}
        >
          <Image
            src="/images/room.png"
            alt="ห้องปริศนา"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {process.env.NODE_ENV === 'development' && (
            roomItems.map(item => (
              <div
                key={item.id}
                className="absolute border-2 border-red-500 opacity-50 pointer-events-none"
                style={{
                  left: `${item.clickArea.x}%`,
                  top: `${item.clickArea.y}%`,
                  width: `${item.clickArea.width}%`,
                  height: `${item.clickArea.height}%`,
                }}
              />
            ))
          )}
        </div>
      </div>
      {/* <LoseModal/> */}
    </div>
  );
}