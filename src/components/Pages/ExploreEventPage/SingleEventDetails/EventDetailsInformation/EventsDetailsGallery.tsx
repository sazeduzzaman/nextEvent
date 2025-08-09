import React, { useState } from "react";

const images = [
  "/images/featureEvents.jpg",
  "/images/featureEvents.jpg",
  "/images/featureEvents.jpg",
  "/images/featureEvents.jpg",
];

const EventsDetailsGallery = () => {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((i) => {
      if (i === null) return 0; // or handle null case
      return i === 0 ? images.length - 1 : i - 1;
    });
  };

  const showNext = (e: any) => {
    e.stopPropagation();
    setLightboxIndex((i) => {
      if (i === null) return 0; // or some default value
      return i === images.length - 1 ? 0 : i + 1;
    });
  };

  return (
    <div>
      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Event image ${i + 1}`}
            className="cursor-pointer object-cover w-full h-full rounded"
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <button
            onClick={showPrev}
            className="absolute left-4 text-white text-3xl font-bold cursor-pointer"
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            src={images[lightboxIndex]}
            alt={`Event image ${lightboxIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on image click
          />
          <button
            onClick={showNext}
            className="absolute right-4 text-white text-3xl font-bold cursor-pointer"
            aria-label="Next image"
          >
            ›
          </button>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
            aria-label="Close lightbox"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsDetailsGallery;
