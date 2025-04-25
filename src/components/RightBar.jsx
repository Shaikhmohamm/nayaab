import React from 'react';
import { useRouter } from 'next/navigation';

const RightBar = () => {
    const router = useRouter()
    return (
        <div className="hidden lg:block w-full md:w-1/4 p-4 md:p-6 bg-white text-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg">

            {/* 👉 Small screens: Minimal version */}
            <div className="block md:hidden text-center">
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                    👋 New Here?
                </h2>4
                <p className="text-sm text-gray-500 mb-3">
                    Join us for exclusive deals and perks!
                </p>
                <button className="w-1/2 bg-gray-800 text-white font-semibold py-2 rounded-xl hover:bg-gray-700 transition duration-200 shadow-sm mx-auto">
                    Register Now
                </button>
            </div>



            {/* 👉 Large screens: Full version */}
            <div className="hidden md:block">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-4 tracking-wide">
                    👋 New Here?
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    Unlock early access, exclusive deals, and a smooth shopping experience by joining our community today.
                </p>

                <div className="mb-8 p-4 rounded-xl text-sm space-y-2 border-l-4 shadow-inner">
                    <p>🛍️ Early access to new arrivals</p>
                    <p>📦 Easy order tracking</p>
                    <p>🎁 Member-only discounts</p>
                    <p>✨ Branding & digital tools</p>
                </div>

                <button
                    onClick={() => router.push("/register")}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-xl transition duration-200 shadow-sm"
                >
                    Register & Start Shopping
                </button>
            </div>
        </div>
    );
};

export default RightBar;
