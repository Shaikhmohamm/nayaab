import React from 'react';

const LeftBar = () => {
  return (
    <div className="w-full lg:w-1/4 p-4 md:p-6 bg-white md:mb-0">
      
      {/* 👉 Small screens: Scrolling bar */}
      <div className="block lg:hidden overflow-hidden whitespace-nowrap">
        <div className="animate-marquee text-gray-500 font-semibold text-sm inline-block">
          Welcome to Nayaab Enterprises | 🚀 Empowering ethical businesses | ✨ Zero-interest financial help | 💡 Startup support | 🔧 Branding tools | 🌱 Connect to grow...
        </div>
      </div>

      {/* 👉 Large screens: Full content */}
      <div className="hidden lg:block"> 
        <h2 className="lg:text-2xl font-extrabold mb-2 tracking-wide">
          🤝 Nayaab Community
        </h2>

        <p className="text-sm leading-relaxed mb-4">
          <strong className="">Nayaab</strong> empowers people to launch and grow businesses with
          <span className="font-semibold"> zero-interest financial help</span> and full-circle support.
        </p>

        <div className="hidden lg:block p-4 rounded-xl text-sm space-y-2 border-l-4 shadow-inner">
          <p>✨ No-interest funding</p>
          <p>✨ Startup guidance</p>
          <p>✨ Strong ethical foundation</p>
          <p>✨ Branding & digital tools</p>
        </div>

        <p className="mt-4 text-xs italic">
          Grow with a purpose. We rise by lifting others.
        </p>
      </div>
    </div>
  );
};

export default LeftBar;
