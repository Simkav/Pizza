import React from "react";
import Footer from "../Footer/Footer";
import cl from "./Content.module.css";
import { useSelector } from "react-redux";

export default function Content(props) {
  const hamburgerMenuState = useSelector((state) => state);
  let mainContentContainerClasses
  if (props.header_state) {
    mainContentContainerClasses = [cl.content_container, cl.content_container_without_header];
  }
  else {
    mainContentContainerClasses = [cl.content_container];
  }

  

  if (hamburgerMenuState) {
    mainContentContainerClasses.push(cl.content_asided);
  }
  //TODO dont render footer if (props.header_state)
  return (
    <div className={mainContentContainerClasses.join(" ")}>
      <footer className={cl.content_footer_container}>
        <Footer />
      </footer>
    </div>
  );
}
