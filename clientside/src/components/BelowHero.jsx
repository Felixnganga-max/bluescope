import {
  FaShippingFast,
  FaRedo,
  FaUser,
  FaThumbsUp,
  FaAward,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";

export default function BelowHero() {
  const features = [
    {
      icon: <FaShippingFast size={32} />,
      title: "Free Shipping",
      desc: "Free shipping to the USA",
    },
    {
      icon: <FaRedo size={32} />,
      title: "Money Guarantee",
      desc: "30-day hassle-free guarantee",
    },
    {
      icon: <FaUser size={32} />,
      title: "Online Support 24/7",
      desc: "Technical support available",
    },
    {
      icon: <FaThumbsUp size={32} />,
      title: "Secure Payment",
      desc: "All payment methods accepted",
    },
    {
      icon: <FaAward size={32} />,
      title: "Member Discount",
      desc: "Get exclusive discounts",
    },
  ];

  return (
    <div className="flex justify-around items-center bg-white py-6 shadow-md">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-gray-700 text-center"
        >
          <div className="text-yellow-500">{feature.icon}</div>
          <h4 className="font-semibold">{feature.title}</h4>
          <p className="text-sm">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}
