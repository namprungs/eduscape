import Link from 'next/link'
import React from 'react'

const LoseModal = () => {
  return (
      <div className="font-jersey fixed inset-0 bg-white/50 flex items-center justify-center z-50">
        <div className="bg-[#D85454]/80 w-[40%] h-[60%] p-6 rounded-[50px] shadow-lg text-center flex flex-col items-center justify-center gap-4">
          <h2 className="text-7xl text-[#003366] font-bold mb-4">game over</h2>
          <p className="text-4xl mb-4">Time&apos;s up. You didn&apos;t pass this test. 
          Try again tomorrow.</p>

          <Link href="/">
            <button className="bg-[#FB9556]/80 w-96 h-16 text-[#EAFBFF] text-5xl px-4 py-2 rounded-full cursor-pointer hover:bg-amber-400 ">exit</button>
          </Link>
        </div>
      </div>
  )
}

export default LoseModal