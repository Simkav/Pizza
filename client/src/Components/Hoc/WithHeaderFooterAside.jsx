import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Aside from "../Aside/Aside";
import ContentHoc from "./ContentHoc/ContentHoc";
const WithHeaderFooterAside = (Component) => (props) => {
  const MainContent = ContentHoc(Component);
  return (
    <>
      <Header />
      <Aside />
      <MainContent />
      <Footer />
    </>
  );
};

export default WithHeaderFooterAside;
