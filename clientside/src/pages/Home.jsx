import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Display from "../components/Display";
import BelowNav from "../components/BelowNav";
import ProductDisplay from "../components/ProductDisplay";
import AddProducts from "../components/AddProducts";
import ProductList from "../components/ProductList";
import BelowHero from "../components/BelowHero";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <BelowNav /> */}
      <Hero />
      <BelowHero />
      <Display />
      <ProductDisplay />
      <ProductList />
    </div>
  );
};

export default Home;
