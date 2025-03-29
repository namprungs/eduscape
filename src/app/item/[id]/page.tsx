'use client'
import { InteractiveItem, interactiveMap } from '@/data/InteractiveItems';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useRef } from 'react';

export default function ItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // ค้นหา currentItem จากทุกฉากใน interactiveMap
  let currentItem: InteractiveItem | undefined;
  for (const scene in interactiveMap) {
    const found = interactiveMap[scene].find(item => item.id === params.id);
    if (found) {
      currentItem = found;
      break;
    }
  }

  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !interactiveMap[params.id]) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // ใช้ interactiveMap[params.id] เฉพาะฉากปัจจุบัน
    const clickedItem = interactiveMap[params.id].find(item => {
      const { x, y, width, height } = item.clickArea;
      return (
        clickX >= x &&
        clickX <= x + width &&
        clickY >= y &&
        clickY <= y + height
      );
    });

    if (clickedItem && clickedItem.id !== params.id) {
      const { x, y, width, height } = clickedItem.clickArea;
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      // ซูมก่อน
      setZoomStyle({
        transformOrigin: `${centerX}% ${centerY}%`,
        transform: 'scale(1.5)',
      });
      setIsZooming(true);

      // เปลี่ยนหน้าไปไอเทมใหม่หลังซูม
      setTimeout(() => {
        router.push(`/item/${clickedItem.id}`);
      }, 500);
    }
  }, [router, params.id]);

  if (!currentItem) {
    return <div className="text-white text-center mt-10">Item not found</div>;
  }

  const handleBack = () => {
    router.back();
  };

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
            src={currentItem.zoomImage}
            alt={currentItem.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {process.env.NODE_ENV === 'development' && interactiveMap[params.id] && (
            interactiveMap[params.id].map(item => (
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

        <button
          onClick={handleBack}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors text-xl font-bold z-10"
          aria-label="Back"
        >
          ×
        </button>

      </div>
    </div>
  );
}