import cl from "./Modal.module.css";
import cn from "classnames";

function Modal({ children, visible, setVisible, handleCancel }) {
  return (
    <div
      className={cn(cl.modal_container, { [cl.active]: visible })}
      onClick={() => !handleCancel ? setVisible((visible) => !visible) : handleCancel()}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default Modal;
