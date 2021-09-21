import React from "react";
import cl from "./Content.module.css";
import cn from "classnames";

const Content = (Component) => (props) => {
  return (
    <div className={cn(cl.content_container)}>
      <Component />
    </div>
  );
};

export default Content;
