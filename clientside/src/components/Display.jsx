import React from "react";
import images from "../assets/assets";

const Display = () => {
  return (
    <div className="z-10 container mx-auto p-2 mb-10">
      <div className="flex flex-col items-start text-center mb-2">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
          Brand Expression Through Quality Designs & Print
        </h1>
        <p className="text-base md:text-lg bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text mt-3 font-medium tracking-wide">
          From concept to creation
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
        {/* Single Large Item */}
        <div className="col-span-2 bg-zinc-900 rounded-xs overflow-hidden h-60 relative group">
          <video
            src={images.printingPens}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <p className="absolute bottom-3 left-3 text-white font-medium">
              <span className="text-xl">Branded pens</span>
              <span className="block text-sm text-zinc-300 mt-0.5">
                Promote with every written word!
              </span>
            </p>
          </div>
        </div>

        {/* Regular Item */}
        <div className="bg-zinc-900 rounded-xs overflow-hidden h-60 relative group">
          <video
            src={images.bags}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white">
              <span className="text-base font-medium">
                Tell them how much you care!
              </span>
              <span className="block text-xs text-zinc-300">
                Premium promotional materials
              </span>
            </p>
          </div>
        </div>

        {/* Regular Item */}
        <div className="bg-zinc-900 rounded-xs overflow-hidden h-60 relative group">
          <video
            src={images.bannerMachine}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Large format printing
            </p>
          </div>
        </div>

        {/* Regular Item */}
        <div className="bg-zinc-900 rounded-md overflow-hidden h-60 relative group">
          <video
            src={images.plotter}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Vinyl Plotter Cutting
              <span className="block text-xs text-zinc-300">
                Precision cuts for perfect results
              </span>
            </p>
          </div>
        </div>

        {/* Wide Item */}
        <div className="col-span-2 bg-zinc-900 rounded-md overflow-hidden h-80 relative group">
          <video
            src={images.printingBooks}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white">
              <span className="text-base font-medium">
                Custom printed books
              </span>
              <span className="block text-xs text-zinc-300">
                Lasting Impressions!
              </span>
            </p>
          </div>
        </div>

        {/* Regular Item */}
        <div className="bg-zinc-900 rounded-xs overflow-hidden h-60 relative group">
          <video
            src={images.mugPrint}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Custom mugs
            </p>
          </div>
        </div>

        {/* Regular Item */}
        <div className="bg-zinc-900 rounded-xs overflow-hidden h-88 relative group -mt-20">
          <video
            src={images.bottle}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Premium Bottles
              <span className="block text-xs text-zinc-300">
                Hydrate in style
              </span>
            </p>
          </div>
        </div>

        {/* Wide Item */}
        <div className="col-span-2 bg-zinc-900 rounded-xs overflow-hidden h-68 relative group">
          <video
            src={images.pillowCase}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white">
              <span className="text-base font-medium">Premium Pillowcases</span>
              <span className="block text-xs text-zinc-300">
                Rest in comfort
              </span>
            </p>
          </div>
        </div>

        {/* Regular Item */}
        <div className="bg-zinc-900 rounded-md overflow-hidden -mt-20 h-88 relative group">
          <video
            src={images.keyholders}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <p className="absolute bottom-3 left-3 text-white">
              <span className="text-base font-medium">Branded keyholders</span>
              <span className="block text-xs text-zinc-300">
                Keep keys safe with style
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
