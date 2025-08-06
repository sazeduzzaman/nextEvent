import React from "react";

const LocationMap = () => {
  return (
    <div className=" space-y-4">
      <h2 className="text-4xl font-extrabold mb-6 text-amber-400 border-l-4 border-amber-400 pl-4">
        Our Location
      </h2>
      <p className="text-sm text-gray-400">
        Find us on the map — we’re always here for your event needs.
      </p>
      <div className="rounded-xl overflow-hidden border border-gray-700 h-[350px] w-full">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902434426225!2d90.39033841498162!3d23.750903284589135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85fc95c26d9%3A0x1d5210cb16a35484!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1622440417037!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationMap;
