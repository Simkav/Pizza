import cl from './Product.module.css';
import ProductForm from '../ProductForms/ProductForm/ProductForm';

function Product({ item, ingridients }) {
  return (
    <li key={item.id} className={cl.product}>
      {<ProductForm item={item} ingridients={ingridients} />}
    </li>
  );
}

export default Product;
