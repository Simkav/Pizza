import Product from '../ProductForms/Product/Product';
import cl from './ProductsList.module.css';

export default function ProductsList ({ products, ingridients }) {
  return (
    <ul className={cl.products_container}>
      {products.map((item) => {
        return <Product key={item.id} item={item} ingridients={ingridients} />;
      })}
    </ul>
  );
}
