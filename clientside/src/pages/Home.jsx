import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Display from "../components/Display";
import BelowNav from "../components/BelowNav";
import ProductDisplay from "../components/ProductDisplay";
import AddProducts from "../components/AddProducts";
import ProductList from "../components/ProductList";
import BelowHero from "../components/BelowHero";
import DisplayA from "../components/DisplayA";
import BusinessShowcase from "../components/BusinessShowcase";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      {/* <BelowNav /> */}
      <Hero />
      <BelowHero />
      <DisplayA />
      <ProductList />
      <BusinessShowcase />

      {/* <ProductDisplay /> */}
    </div>
  );
};

export default Home;
