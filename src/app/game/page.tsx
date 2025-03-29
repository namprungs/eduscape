'use client'
import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';

interface InteractiveItem {
  id: string;
  name: string;
  zoomImage: string;
  clickArea: {
    x: number; // % from left
    y: number; // % from top
    width: number; // % width
    height: number; // % height
  };
}

const interactiveItems: InteractiveItem[] = [
  {
    id: 'board',
    name: 'บอร์ด',
    zoomImage: '/images/board.png',
    clickArea: { x: 30, y: 10, width: 35, height: 45 }
  },
  {
    id: 'apple',
    name: 'แอปเปิ้ล',
    zoomImage: '/images/zoomapple.png',
    clickArea: { x: 50, y: 77, width: 6, height: 10 }
  },
  {
    id: 'table',
    name: 'โต๊ะ',
    zoomImage: '/images/on_the_table.png',
    clickArea: { x: 0, y: 50, width: 30, height: 50 }
  }
];

export default function PuzzleRoom() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const clickedItem = interactiveItems.find(item => {
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
      // คำนวณจุดกึ่งกลางของ clickArea เป็นเปอร์เซ็นต์
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      // ตั้งค่า transform-origin และ scale ค้างไว้
      setZoomStyle({
        transformOrigin: `${centerX}% ${centerY}%`,
        transform: 'scale(1.5)', // คงการซูมไว้
      });

      setIsZooming(true);
      setTimeout(() => {
        setSelectedItem(clickedItem.id);
        setIsZooming(false);
        // ไม่รีเซ็ต zoomStyle ที่นี่ เพื่อให้ค้างการซูม
      }, 500);
    }
  }, []);

  const closeZoom = useCallback(() => {
    setSelectedItem(null);
    setZoomStyle({}); // รีเซ็ตการซูมเมื่อปิดป็อปอัพ
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 overflow-hidden cursor-">
      {/* Main Container */}
      <div className="relative w-full h-full">
        {/* Background Image */}
        <div
          ref={containerRef}
          className={`relative w-full h-full cursor-pointer select-none transition-transform duration-500`}
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

          {/* Debug Areas */}
          {process.env.NODE_ENV === 'development' && (
            interactiveItems.map(item => (
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

        {/* Zoom Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeZoom}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeZoom}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                aria-label="Close"
              >
                ×
              </button>

              {interactiveItems
                .filter(item => item.id === selectedItem)
                .map(item => (
                  <div key={item.id} className="flex flex-col items-center gap-4 p-4">
                    <div className="relative w-full max-h-[70vh]">
                      <Image
                        src={item.zoomImage}
                        alt={item.name}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  );
}