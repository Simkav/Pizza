import Modal from '../../Modal/Modal';
import cl from './ProductOrderModal.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export default function ProductOrderModal({ isOrdered, setIsOrdered }) {
  const handleClose = () => setIsOrdered(false);

  return (
    <Modal visible={isOrdered} handleClose={handleClose}>
      <div className={cl.error_window}>
        <span className={cl.error_span}>Товар добавлен в корзину</span>
        <div className={cl.error_window_buttons_container}>
          <Link to={'/cart'} className={cn(cl.error_window_button, cl.apply)}>
            Оформить заказ
          </Link>
          <div
            onClick={() => setIsOrdered(false)}
            className={cn(cl.error_window_button, cl.apply)}
          >
            Вернуться назад
          </div>
        </div>
      </div>
    </Modal>
  );
}
