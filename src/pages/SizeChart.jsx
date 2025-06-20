import React from 'react';
import Header from '/src/Components/Header';
import image from '../assets/size_chart.png'
import Footer from "/src/Components/Footer";


function SizeChart() {
  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto p-4">
        {/* <h1 className="text-2xl font-semibold mb-4 text-center">Size Chart</h1> */}
        
        <div className="border rounded-lg shadow-md p-4 bg-white">
          <img
            src={image}
            alt="Size Chart"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default SizeChart;
