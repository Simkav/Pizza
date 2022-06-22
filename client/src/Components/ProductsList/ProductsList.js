import { useState } from 'react';
import Product from '../ProductForms/Product/Product';
import ProductOrderModal from '../ProductForms/ProductOrderModal/ProductOrderModal';
import cl from './ProductsList.module.css';

export default function ProductsList({ products, ingridients }) {
  const [isOrdered, setIsOrdered] = useState(false);
  return (
    <>
      <ul className={cl.products_container}>
        {products.map((item) => {
          return (
            <Product
              setIsOrdered={setIsOrdered}
              key={item.id}
              item={item}
              ingridients={ingridients}
            />
          );
        })}
      </ul>
      {<ProductOrderModal isOrdered={isOrdered} setIsOrdered={setIsOrdered} />}
    </>
  );
}
