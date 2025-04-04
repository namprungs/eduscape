import type { Metadata } from "next";
import "../globals.css";
import { jersey10 } from "@/font/fonts";




export const metadata: Metadata = {
  title: "EduScape",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jersey10.className} min-h-screen relative text-white`}>
        <div
          className="fixed inset-0 -z-10 h-full w-full"
          style={{
            backgroundImage: "url('/bg/room_background.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        />
          {children}
      </body>
    </html>
  );
}
