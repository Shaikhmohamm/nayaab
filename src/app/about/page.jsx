"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const AboutPage = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("#")) {
      const sectionId = pathname.split("#")[1];
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-screen text-gray-900">
      {/* 🌟 Hero Section */}
      <section id="about-section" className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200 text-center px-6">
        <h1 className="text-5xl font-bold">About Nayaab Enterprises</h1>
        <p className="mt-4 text-lg max-w-2xl">
          Welcome to Nayaab Enterprises! Your one-stop shop for the most exquisite and thoughtful gifts. 
          We believe in spreading joy through unique and high-quality products.
        </p>
      </section>

      {/* 🎯 Our Mission */}
      <section id="mission" className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold">Our Mission</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          We aim to bring happiness through personalized, creative, and handpicked gifts for all occasions.
          Quality, uniqueness, and customer satisfaction are our top priorities.
        </p>
      </section>

      {/* 🚀 Our Team */}
      <section id="team" className="py-20 bg-blue-50 text-center">
        <h2 className="text-4xl font-bold">Meet Our Team</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6 px-6">
          {/* Team Member 1 */}
          <div className="bg-white p-6 shadow-lg rounded-xl w-80">
            <img src="/team1.jpg" alt="Founder" className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4">Ayesha Khan</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="bg-white p-6 shadow-lg rounded-xl w-80">
            <img src="/team2.jpg" alt="Designer" className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4">Rehan Ali</h3>
            <p className="text-gray-600">Creative Designer</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 shadow-lg rounded-xl w-80">
            <img src="/team3.jpg" alt="Manager" className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4">Sara Malik</h3>
            <p className="text-gray-600">Operations Manager</p>
          </div>
        </div>
      </section>

      {/* 🛍️ Call to Action */}
      <section id="shop" className="py-20 bg-gradient-to-r from-purple-200 to-blue-200 text-center">
        <h2 className="text-4xl font-bold">Explore Our Collection</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Browse through our carefully selected gifts and find the perfect one for your loved ones.
        </p>
        <a href="/shop" className="mt-6 inline-block px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition">
          Visit Our Shop
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
