import { useState, useRef, useCallback } from 'react';

export default function usePopUp () {
  const [value, setValue] = useState({
    hovered: false,
    visible: false,
  });

  const handleMouseOver = useCallback(
    () => setValue((value) => ({ ...value, hovered: true })),
    [],
  );
  const handleMouseOut = useCallback(
    () => setValue((value) => ({ ...value, hovered: false })),
    [],
  );

  const handleClick = useCallback(
    () => setValue((value) => ({ ...value, visible: true })),
    [],
  );
  const handleBlur = useCallback(
    () => setValue((value) => ({ ...value, visible: false })),
    [],
  );

  const usePopUpItems = Object.entries({
    mouseenter: handleMouseOver,
    mouseleave: handleMouseOut,
    click: handleClick,
    blur: handleBlur,
  });

  const ref = useRef();

  const callbackRef = useCallback(
    (node) => {
      if (ref.current) {
        usePopUpItems.forEach(([name, fn]) =>
          ref.current.removeEventListener(name, fn),
        );
        ref.current.removeAttribute('tabIndex');
      }

      ref.current = node;

      if (ref.current) {
        usePopUpItems.forEach(([name, fn]) =>
          ref.current.addEventListener(name, fn),
        );
        ref.current.setAttribute('tabIndex', -1);
      }
    },
    [handleMouseOver, handleMouseOut, handleClick, handleBlur],
  );

  return [value.hovered, value.visible, callbackRef];
}
