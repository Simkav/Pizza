import cl from './Product.module.css'
import ProductImage from '../ProductImage/ProductImage'
import ProductIngridients from '../ProductIngridients/ProductIngridients'
import ProductFooter from '../ProductFooter/ProductFooter'
import { useState } from 'react'

export default function Product ({ item, ingridients }) {
  const [isHovered, setHovered] = useState(false)
  return (
    <li className={cl.product}>
      {
        <div className={cl.product_link_container} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(isHovered => !isHovered)}>
          <ProductImage item={item} />
          <h3>{item.name}</h3>
          <ProductIngridients item={item} ingridients={ingridients} />
          <ProductFooter item={item} isHovered={isHovered} />
        </div>
      }
    </li>
  )
}
