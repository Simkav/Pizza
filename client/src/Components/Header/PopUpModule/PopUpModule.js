import React from "react";
import cl from "./PopUpModule.module.css";

export default function PopUpModule({ children, visible, setVisible }) {
  const subClasses = [cl.popup_container];
  const rootClasses = [cl.popup];

  if (visible) {
    subClasses.push(cl.active);
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(" ")}>
      <div className={subClasses.join(" ")} onClick={() => setVisible(false)} />
      <div className={cl.popup_children} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
