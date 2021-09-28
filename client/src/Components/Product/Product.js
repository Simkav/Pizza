import ProductBody from '../ProductForms/ProductBody/ProductBody';
import ProductFooter from '../ProductForms/ProductFooter/ProductFooter';
import cl from './Product.module.css';

function Product({ item, ingridients }) {
  return (
    <li key={item.id} className={cl.product}>
      {
        <>
          <ProductBody item={item} ingridients={ingridients}/>
          <ProductFooter price={item.price} weight={item.weight}/>
        </>
      }
    </li>
  );
}

export default Product;
