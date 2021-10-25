import { useState, useRef, useCallback } from 'react';

export default function usePopUp () {
  const [value, setValue] = useState({
    hovered: false,
    visible: false
  });

  const handleMouseOver = useCallback(() => setValue((value) => ({...value, hovered : true})), []);
  const handleMouseOut = useCallback(() => setValue((value) => ({...value, hovered : false})), []);

  const handleClick = useCallback(() => setValue((value) => ({...value, visible : true})), []);
  const handleBlur = useCallback(() => setValue((value) => ({...value, visible : false})), []);

  const ref = useRef();

  const callbackRef = useCallback(
    (node) => {
      if (ref.current) {
        ref.current.removeAttribute('tabIndex')
        ref.current.removeEventListener('mouseenter', handleMouseOver);
        ref.current.removeEventListener('mouseleave', handleMouseOut);
        ref.current.removeEventListener('click', handleClick);
        ref.current.removeEventListener('blur', handleBlur);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.setAttribute('tabIndex', -1)
        ref.current.addEventListener('mouseenter', handleMouseOver);
        ref.current.addEventListener('mouseleave', handleMouseOut);
        ref.current.addEventListener('click', handleClick);
        ref.current.addEventListener('blur', handleBlur);
      }
    },
    [handleMouseOver, handleMouseOut, handleClick, handleBlur],
  );

  return [value.hovered, value.visible, callbackRef];
}
