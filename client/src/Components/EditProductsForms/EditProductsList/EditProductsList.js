import EditProduct from '../EditProduct/EditProduct'
import cl from './EditProductsList.module.css'
import { FaPlusCircle } from 'react-icons/fa'
import { useState } from 'react'
import ProductModals from '../ProductModals/ProductModals'

export default function EditProductsList ({ products, ingridients }) {
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  return (
    <div>
      <ul className={cl.products_container}>
        <li
          className={cl.edit_product_button}
          onClick={() => setAddModalOpen(true)}
        >
          <FaPlusCircle />
        </li>
        {products.map(item => {
          return (
            <EditProduct key={item.id} item={item} ingridients={ingridients} />
          )
        })}
      </ul>
      <ProductModals isAddModalOpen={isAddModalOpen} setAddModalOpen={setAddModalOpen}/>
    </div>
  )
}
