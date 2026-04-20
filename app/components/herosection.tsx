'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-[#0f6b57] text-white overflow-hidden">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="font-bold text-lg tracking-widest">BARBR</h1>
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
        </div>
      </div>

      {/* Curved Line */}
      <div className="absolute top-32 left-0 w-full h-[200px] pointer-events-none">
        <svg viewBox="0 0 1200 200" className="w-full h-full">
          <path
            d="M0,100 C300,200 900,0 1200,100"
            stroke="#facc15"
            strokeWidth="6"
            fill="transparent"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="text-center px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          CLASSIC CUTS, MODERN <br /> LOOKS THE BEST
        </h2>

        <p className="mt-4 text-sm md:text-base text-gray-200">
          We combine tradition with trend. From sharp fades to classic shaves,
          get a grooming experience built just for you.
        </p>

        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-full transition">
          Book An Appointment
        </button>
      </div>

      {/* Bottom Images */}
      <div className="flex justify-center gap-4 pb-12 px-4 flex-wrap">
        
        <div className="bg-green-400 p-2 rounded-[40px]">
          <Image
            src=""
            alt="hair1"
            width={150}
            height={150}
            className="rounded-[30px] object-cover"
          />
        </div>

        <div className="bg-yellow-200 p-2 rounded-[40px]">
          <Image
            src=""
            alt="hair2"
            width={150}
            height={150}
            className="rounded-[30px] object-cover"
          />
        </div>

        <div className="bg-pink-200 p-2 rounded-[40px]">
          <Image
            src=""
            alt="hair3"
            width={150}
            height={150}
            className="rounded-[30px] object-cover"
          />
        </div>

        <div className="bg-yellow-300 p-2 rounded-[40px]">
          <Image
            src="barberln"
            alt="hair4"
            width={150}
            height={150}
            className="rounded-[30px] object-cover"
          />
        </div>

      </div>
    </section>
  );
}