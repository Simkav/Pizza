import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Aside from "../../Aside/Aside";
import cl from './WithHeaderFooterAside.module.css'
const WithHeaderFooterAside = (Component) => (props) => {
  return (
    <>
      <Header />
      <Aside />
      <div className={cl.content_container}>
        <Component />
      </div>
      <Footer />
    </>
  );
};

export default WithHeaderFooterAside;
