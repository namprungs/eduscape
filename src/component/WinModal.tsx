import Link from 'next/link'
import React from 'react'

const WinModal = () => {
  return (
      <div className="font-jersey fixed inset-0 bg-white/50 flex items-center justify-center z-50">
        <div className="bg-[#67BB68]/80 w-[40%] h-[60%] p-10 rounded-[50px] shadow-lg text-center flex flex-col items-center justify-center gap-4">
          <h2 className="text-7xl text-[#003366] font-bold mb-4">You Win!!!!!!</h2>
          <p className="text-3xl mb-4">Congratulations! You have successfully passed the test and can now exit the room.</p>
          <Link href="/stats">
            <button className="bg-[#FFE693]/80 w-80 h-16 text-black text-5xl px-4 py-2 rounded-full cursor-pointer hover:bg-amber-400 ">stats</button>
          </Link>
        </div>
      </div>
  )
}

export default WinModal