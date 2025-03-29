// types/user.d.ts (หรือไฟล์ที่เหมาะสม)
export interface User {
  username: string;
  // เพิ่มข้อมูลเพิ่มเติมตามที่ต้องการ
}

export interface JWT extends User {
  token: string; // เพิ่มข้อมูลที่ต้องการใน JWT
}

export interface Session {
  user: {
    username: string;
    // เพิ่มข้อมูลเพิ่มเติมตามที่ต้องการ
    token: string;
  };
  expires: string;
}
