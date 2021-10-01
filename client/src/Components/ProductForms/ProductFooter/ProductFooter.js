import cl from './ProductFooter.module.css'

export default function ProductFooter({price, weight}) {
  return (
    <div className={cl.product_footer}>
      <span className={cl.product_price}>Цена: {price}</span>
      <span className={cl.product_weight}>Вес: {weight}</span>
    </div>
  );
}
