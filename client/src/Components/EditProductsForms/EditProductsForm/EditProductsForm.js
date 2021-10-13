import { useSelector } from 'react-redux'
import EditProductsList from '../EditProductsList/EditProductsList'

export default function EditProductsForm () {
  const ingridients = useSelector(({ ingridients }) => ingridients.ingridients)
  const products = useSelector(({ products }) => products.products)
  return (
    <div>
      {products ? (
        <EditProductsList ingridients={ingridients} products={products} />
      ) : null}
    </div>
  )
}
