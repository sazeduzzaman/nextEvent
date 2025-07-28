"use client";

import React from "react";

const ComingSoon = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg')`,
      }}
    >
      <div className="w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            We Are <span className="text-yellow-300">Coming Soon</span>
          </h1>

          <p className="text-gray-300 mb-8">
            Our website is under construction. Stay tuned!
          </p>

          <form className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-72 text-black rounded-md"
            />
            <button className="bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition">
              Notify Me
            </button>
          </form>

          <div className="flex justify-center space-x-4 mt-6">
            {["facebook", "twitter", "linkedin"].map((platform) => (
              <a key={platform} href="#" title={platform}>
                <img
                  src={`/icons/${platform}.svg`}
                  alt={platform}
                  className="w-8 h-8 hover:scale-110 transition duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
