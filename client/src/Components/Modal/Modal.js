import cl from "./Modal.module.css";
import ReactModal from 'react-modal'

export default function Modal({ children, visible, handleCancel }) {
  return (
    <ReactModal
      isOpen={visible}
      onRequestClose={() => handleCancel()}
      className={cl.ReactModal_Content}
      shouldFocusAfterRender={false}
      overlayClassName={{base: cl.ReactModal_Overlay, afterOpen: cl.ReactModal_Overlay_after_open, beforeClose: cl.ReactModal_Overlay_before_close }}
    >{children}
    </ReactModal>
  );
}
