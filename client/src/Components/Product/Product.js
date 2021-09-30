import cl from './Product.module.css'
import ProductForm from '../ProductForms/ProductForm/ProductForm'

function Product ({ item, ingridients }) {
  // TODO починить криндж, либо перенести сюда ProductForm либо наоборот!!!
  return (
    <li key={item.id} className={cl.product}>
      {<ProductForm item={item} ingridients={ingridients} />}
    </li>
  )
}

export default Product
