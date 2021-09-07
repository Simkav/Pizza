import React from "react";
import cl from "./Content.module.css";
import { useSelector } from "react-redux";
import cn from "classnames";

export default function Content(props) {
  const hamburgerMenuState = useSelector((state) => state);

  return (
    <div
      className={cn(
        cl.content_container,
        { [cl.content_fullscreen]: props.header_aside_disabled },
        { [cl.content_with_aside]: hamburgerMenuState }
      )}
    >
      {props.children}
    </div>
  );
}
