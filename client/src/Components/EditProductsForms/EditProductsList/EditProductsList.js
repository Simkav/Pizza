import EditProduct from '../EditProduct/EditProduct'
import cl from './EditProductsList.module.css'
import { FaPlusCircle } from 'react-icons/fa'
import { useState } from 'react'
import ProductModals from '../ProductModals/ProductModals'

export default function EditProductsList ({ products, ingridients }) {
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState({
    id: false,
    name: '',
    state: false
  })
  const [isEditModalOpen, setEditModalOpen] = useState({
    state: false
  })

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
            <EditProduct
              key={item.id}
              item={item}
              ingridients={ingridients}
              setDeleteModalOpen={setDeleteModalOpen}
              setEditModalOpen={setEditModalOpen}
            />
          )
        })}
      </ul>
      <ProductModals
        isAddModalOpen={isAddModalOpen}
        setAddModalOpen={setAddModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  )
}
