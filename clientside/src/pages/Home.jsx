import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Display from "../components/Display";
import BelowNav from "../components/BelowNav";

const Home = () => {
  return (
    <div>
      <Navbar />
      <BelowNav />
      <Hero />
      <Display />
    </div>
  );
};

export default Home;
