import React from "react";
import Footer from "../../Footer/Footer";
import Aside from "../../Aside/Aside";
import cl from './WithHeaderFooterAside.module.css'
import Header from "../../HeaderForms/Header/Header";
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
