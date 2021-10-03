import ProductFooter from '../../ProductForms/ProductFooter/ProductFooter'
import ProductImage from '../../ProductForms/ProductImage/ProductImage'
import ProductIngridients from '../../ProductForms/ProductIngridients/ProductIngridients'
import cl from './EditProduct.module.css'

export default function EditProduct ({ item, ingridients }) {
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
