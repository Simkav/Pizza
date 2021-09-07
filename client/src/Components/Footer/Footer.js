import React from "react";
import cl from "./Footer.module.css";
import { useSelector } from "react-redux";

export default function Footer() {
  const hamburgerMenuState = useSelector((state) => state);

  let footerContainerClasses = [cl.footer_container];
  if (hamburgerMenuState) {
    footerContainerClasses.push(cl.footer_with_aside);
  }

  return (
    <div className={footerContainerClasses.join(" ")}>
      <div className={cl.footer_copyright_container}>
        <span>© «Mister Cat» является зарегистрированной торговой маркой</span>
      </div>
    </div>
  );
}
