import React from "react";
import cl from "./Footer.module.css";
import cn from "classnames";

export default function Footer() {
  return (
    <div className={cn(cl.footer_container)}>
      <div className={cl.footer_copyright_container}>
        <span>© «Mister Cat» является зарегистрированной торговой маркой</span>
      </div>
    </div>
  );
}
