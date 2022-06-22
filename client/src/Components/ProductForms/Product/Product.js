import cl from './Product.module.css';
import ProductImage from '../ProductImage/ProductImage';
import ProductIngridients from '../ProductIngridients/ProductIngridients';
import ProductFooter from '../ProductFooter/ProductFooter';
import useHovered from '../../../Hooks/useHovered';

export default function Product ({ setIsOrdered, item, ingridients }) {
  const [isHovered, hoverRef] = useHovered();
  
  return (
    <li className={cl.product}>
      {
        <div ref={hoverRef} className={cl.product_link_container}>
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
