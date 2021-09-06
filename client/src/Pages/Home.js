import React from "react";
import Aside from "../Components/Aside/Aside";
import Content from "../Components/Content/Content";
import Header from "../Components/Header/Header/Header";

function Home() {
  return (
    <div>
      <Header />
      <Aside />
      <Content />
    </div>
  );
}

export default Home;
