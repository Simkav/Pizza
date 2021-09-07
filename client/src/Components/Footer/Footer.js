import React from "react";
import cl from "./Footer.module.css";
import { useSelector } from "react-redux";
import cn from "classnames";

export default function Footer() {
  const hamburgerMenuState = useSelector((state) => state);

  return (
    <div
      className={cn(cl.footer_container, {
        [cl.footer_with_aside]: hamburgerMenuState,
      })}
    >
      <div className={cl.footer_copyright_container}>
        <span>© «Mister Cat» является зарегистрированной торговой маркой</span>
      </div>
    </div>
  );
}
