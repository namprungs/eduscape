'use client'
import { InteractiveItem, interactiveMap } from '@/data/InteractiveItems';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useRef } from 'react';

export default function ItemPage() {
  const router = useRouter();





  return (
    <div className="w-screen h-screen bg-gray-900 overflow-hidden cursor-pointer">
      <div className="relative w-full h-full">
        <div
          className="relative w-full h-full select-none transition-transform duration-500 bg-[]"
        />
        

        

        <button
          onClick={() => router.back()}
          className="absolute top-3 right-3 bg-red-500 #808283 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors text-xl font-bold z-10"
          aria-label="Back"
        >
          ×
        </button>

      </div>
    </div>
  );
}