import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Aside from "../Aside/Aside";
import Content from "../Content/Content";
const WithHeaderFooterAside = (Component) => (props) =>
  (
    <>
      <Header />
      <Aside />
      <Content>
        <Component {...props} />
      </Content>
      <Footer />
    </>
  );

export default WithHeaderFooterAside;
