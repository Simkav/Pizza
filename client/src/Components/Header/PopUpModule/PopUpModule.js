import React from "react";
import cl from "./PopUpModule.module.css";
import cn from "classnames";

export default function PopUpModule({ children, visible, setVisible }) {
  return (
    <div className={cn(cl.popup, { [cl.active]: visible })}>
      <div
        className={cn(cl.popup_container, { [cl.active]: visible })}
        onClick={() => setVisible(false)}
      />
      <div className={cl.popup_children} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
