import Product from '../Product/Product';
import cl from './ProductsList.module.css';

function ProductsList({ products, ingridients }) {
  return (
    <div>
      <ul className={cl.products_container}>
        {products.map((item) => {
          return <Product key={item.id} item={item} ingridients={ingridients}/>;
        })}
      </ul>
    </div>
  );
}

export default ProductsList;
