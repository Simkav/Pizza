import cl from './Product.module.css'
import ProductImage from '../ProductImage/ProductImage'
import ProductIngridients from '../ProductIngridients/ProductIngridients'
import ProductFooter from '../ProductFooter/ProductFooter'

export default function Product ({ item, ingridients }) {
  return (
    <li key={item.id} className={cl.product}>
      {
        <div className={cl.product_link_container}>
          <ProductImage item={item} />
          <h3>{item.name}</h3>
          <ProductIngridients item={item} ingridients={ingridients} />
          <ProductFooter weight={item.weight} price={item.price} />
        </div>
      }
    </li>
  )
}
