import cl from './ProductFooter.module.css'
import cn from 'classnames'

function ProductFooter({price, weight}) {
  return (
    <div className={cl.product_footer}>
      <span className={cl.product_price}>Цена: {price}</span>
      <span className={cl.product_weight}>Вес: {weight}</span>
      <div className={cl.product_sizes}>
        <div className={cn(cl.product_size, cl.product_size_active)}>
          <span>M</span>
        </div>
        <div className={cl.product_size}>
          <span>L</span>
        </div>
        <div className={cl.product_size}>
          <span>XL</span>
        </div>
      </div>
    </div>
  );
}

export default ProductFooter;
