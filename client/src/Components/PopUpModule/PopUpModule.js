import cl from './PopUpModule.module.css';
import cn from 'classnames';

export default function PopUpModule ({
  children,
  visible,
  hovered,
}) {
  return (
    <div
      className={cn(cl.popup, { [cl.active]: visible || hovered })}
    >
      <div
        className={cl.popup_children}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
