import React from "react";
import cl from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={cl.footer_container}>
      <div className={cl.footer_copyright_container}>
        <span>© «Mister Cat» является зарегистрированной торговой маркой</span>
      </div>
    </div>
  );
}
