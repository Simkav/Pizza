import cl from './Modal.module.css';
import ReactModal from 'react-modal';
import { memo } from 'react';

export default memo(function Modal({
  children,
  visible,
  handleClose,
  handleClosed,
}) {
  return (
    <ReactModal
      isOpen={visible}
      onAfterClose={() => (handleClosed ? handleClosed() : null)}
      onRequestClose={() => handleClose()}
      className={cl.ReactModal_Content}
      shouldFocusAfterRender={false}
      openTimeoutMS={500}
      closeTimeoutMS={500}
      overlayClassName={{
        base: cl.ReactModal_Overlay,
        afterOpen: cl.ReactModal_Overlay_after_open,
        beforeClose: cl.ReactModal_Overlay_before_close,
      }}
    >
      {children}
    </ReactModal>
  );
})
