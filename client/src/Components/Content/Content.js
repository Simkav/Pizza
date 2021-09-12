import React from "react";
import cl from "./Content.module.css";
import cn from "classnames";

export default function Content(props) {
  return <div className={cn(cl.content_container)}>{props.children}</div>;
}
