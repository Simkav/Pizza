import cl from './Product.module.css';
import ProductImage from '../ProductImage/ProductImage';
import ProductIngridients from '../ProductIngridients/ProductIngridients';
import ProductFooter from '../ProductFooter/ProductFooter';
import { useState } from 'react';

export default function Product({ setIsOrdered, item, ingridients }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <li className={cl.product}>
      {
        <div
          className={cl.product_link_container}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <ProductImage item={item} />
          <h3>{item.name}</h3>
          <ProductIngridients item={item} ingridients={ingridients} />
          <ProductFooter
            isHovered={isHovered}
            setIsOrdered={setIsOrdered}
            item={item}
          />
        </div>
      }
    </li>
  );
}
