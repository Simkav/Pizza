import cl from './ProductFooter.module.css';
import ProductCartOrderButton from '../ProductCartOrderButton/ProductCartOrderButton';
import { useHistory } from 'react-router';

export default function ProductFooter ({ item }) {
  const path = useHistory().location.pathname;
  return (
    <div className={cl.product_footer}>
      <span className={cl.product_price}>Цена: {item.price}</span>
      <span className={cl.product_weight}>Вес: {item.weight}</span>
      {path !== '/edit_products' ? (
        <ProductCartOrderButton id={item.id} />
      ) : null}
    </div>
  );
}
