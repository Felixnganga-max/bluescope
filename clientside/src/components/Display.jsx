import React from "react";
import images from "../assets/assets";

const Display = () => {
  return (
    <div className="mt-[-40px] z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      <div className="bg-blue-100 rounded-xl shadow-lg flex flex-col items-start py-2 justify-between text-center font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Tell them how much you care!
        </p>
        <video
          src={images.bags}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover rounded-md shadow-md"
        />
      </div>
      <div className="bg-pink-100 rounded-xl shadow-lg flex-col col-span-1 md:col-span-2 lg:col-span-2 row-span-1 flex items-start justify-between text-center font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Branded pens
          <br />
          <span className="text-sm">Promote with every written word!</span>
        </p>
        <video
          src={images.printingPens}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover rounded-sm shadow-md"
        />
      </div>
      <div className="bg-purple-100 rounded-sm shadow-lg flex-col flex items-start justify-between text-center font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Large format printing
        </p>
        <video
          src={images.bannerMachine}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover rounded-md shadow-md"
        />
      </div>
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-md shadow-lg col-span-1 row-span-1 flex flex-col items-center justify-center text-center gap-4 hover:shadow-xl transition-shadow duration-300">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Custom printed, notebooks & more...
          <br />
          <span className="text-sm">
            Custom Covers, Branded Pages, Lasting Impressions!
          </span>
        </p>
        <video
          src={images.printingBooks}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover rounded-md shadow-md"
        />
      </div>
      <div className="bg-orange-100 p-2 flex-col rounded-xl shadow-lg flex items-start justify-between text-center font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Vinyl Plotter Cutting
        </p>
        <video
          src={images.plotter}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover rounded-md shadow-md"
        />
      </div>
      <div className="bg-green-100 p-2 rounded-xl shadow-lg flex items-start flex-col justify-between text-center font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Custom printed books, notebooks & more...
        </p>
        <video
          src={images.mugPrint}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover rounded-md shadow-md"
        />
      </div>
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
        <p className="text-gray-800 text-lg md:text-lg font-medium leading-snug text-left">
          You definitely want to have this!
        </p>
        <div className="overflow-hidden rounded-lg w-full">
          <img
            src={images.mugs}
            alt="Custom printed mugs"
            className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </div>
      <div className="bg-pink-200 p-2 rounded-xl shadow-lg col-span-1 row-span-2 flex items-start justify-between flex-col text-center font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Pillowcases
        </p>
        <video
          src={images.pillowCase}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover rounded-md shadow-md"
        />
      </div>
      <div className="bg-blue-200 p-2 rounded-xl shadow-lg flex flex-col items-start justify-between text-center row-span-3 font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Custom printed mugs
        </p>
        <video
          src={images.bottle}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-80 object-cover rounded-md shadow-md"
        />
      </div>
      <div className="bg-yellow-200 rounded-xl shadow-lg flex flex-col items-center justify-center text-center font-semibold">
        <p className="text-gray-800 text-left text-lg md:text-lg font-medium leading-snug py-2">
          Branded keyholders <br />
          <span className="text-xs">
            Keep keys safe with our custom printed keychains
          </span>
        </p>
        <video
          src={images.keyholders}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-50 md:h-60 object-cover shadow-md"
        />
      </div>
    </div>
  );
};

export default Display;
