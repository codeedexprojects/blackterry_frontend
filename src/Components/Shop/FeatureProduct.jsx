import React from "react";
import image1 from '../../assets/Carousals/image1.jpg';
import image2 from '../../assets/Carousals/image2.jpg';
import image3 from '../../assets/Carousals/image3.jpg';
import image4 from '../../assets/Carousals/image4.jpg';
import image5 from '../../assets/Carousals/image5.jpg';
import image6 from '../../assets/Carousals/image6.jpg';
import image7 from '../../assets/Carousals/image7.jpg';

export default function StaggeredCarousel() {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ];

  return (
    <div className="w-full overflow-x-auto py-12 px-8 ">
      <div className="flex gap-8">
        {images.map((src, idx) => {
          const isBig = idx % 2 === 0; 
          return (
            <div
              key={idx}
              className={`flex-shrink-0 w-64 rounded-3xl overflow-hidden shadow-md ${
                isBig ? "h-96" : "h-80 mt-12"
              } bg-white`}
            >
              <img
                src={src}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
