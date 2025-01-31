import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Display from "../components/Display";
import BelowNav from "../components/BelowNav";
import ProductDisplay from "../components/ProductDisplay";

const Home = () => {
  return (
    <div>
      <Navbar />
      <BelowNav />
      <Hero />
      <Display />
      <ProductDisplay />
      <ProductDisplay />
      <ProductDisplay />
    </div>
  );
};

export default Home;
