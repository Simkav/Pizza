import cl from './PopUpModule.module.css';
import cn from 'classnames';

export default function PopUpModule({ children, visible }) {
  return (
    <div className={cn(cl.popup, { [cl.active]: visible })}>
      <div className={cn(cl.popup_container, { [cl.active]: visible })} />
      <div className={cl.popup_children} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
