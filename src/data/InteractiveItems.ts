export interface InteractiveItem {
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

export const interactiveMap: Record<string, InteractiveItem[]> = {
  room: [
    {
      id: "note_glass",
      name: "โน้ตคณิตศาสตร์",
      zoomImage: "/images/note_glass.png",
      clickArea: { x: 33, y: 36, width: 6, height: 8 },
    },
    {
      id: "note_physic",
      name: "โน้ตฟิสิก",
      zoomImage: "/images/note_physic.png", // อาจจะเปลี่ยนรูปถ้ามีรูปจริงของ note_physic
      clickArea: { x: 48, y: 26, width: 4, height: 8 },
    },
    {
      id: "apple",
      name: "แอปเปิ้ล",
      zoomImage: "/images/zoomapple.png",
      clickArea: { x: 60, y: 75, width: 6, height: 10 },
    },
    {
      id: "table",
      name: "โต๊ะ",
      zoomImage: "/images/on_the_table.png",
      clickArea: { x: 0, y: 50, width: 30, height: 50 },
    },
    {
      id: "doorlock",
      name: "ประตูล็อค",
      zoomImage: "/images/doorlock.png",
      clickArea: { x: 67.5, y: 38, width: 5, height: 12 },
    },
  ],
  note_math: [
    {
      id: "note_math",
      name: "โน้ตคณิตศาสตร์",
      zoomImage: "/images/note_math.png",
      clickArea: { x: 33, y: 36, width: 6, height: 8 },
    },
  ],
  table: [
    {
      id: "ipad",
      name: "ไอแพด",
      zoomImage: "/images/ipad.png",
      clickArea: { x: 30, y: 40, width: 40, height: 50 },
    },
    {
      id: "glass",
      name: "แก้วน้ำ",
      zoomImage: "/images/glass.png",
      clickArea: { x: 73, y: 0, width: 20, height: 40 },
    },
    {
      id: "note_ipad",
      name: "โน้ตไอแพด",
      zoomImage: "/images/note_ipad.png",
      clickArea: { x: 25, y: 15, width: 18, height: 20 },
    }
  ],
};