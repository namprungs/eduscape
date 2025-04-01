// types/user.d.ts (หรือไฟล์ที่เหมาะสม)
export interface User {
  username: string;
  // เพิ่มข้อมูลเพิ่มเติมตามที่ต้องการ
}

interface CustomUser extends User {
  username: string;
  token: string;
}

export interface JWT extends User {
  token: string; // เพิ่มข้อมูลที่ต้องการใน JWT
}

export interface Session {
  user: {
    username: string;
    token: string;
  };
  
  expires: string;
}
