import { FaEdit, FaTrash } from 'react-icons/fa'
import ProductFooter from '../../ProductForms/ProductFooter/ProductFooter'
import ProductImage from '../../ProductForms/ProductImage/ProductImage'
import ProductIngridients from '../../ProductForms/ProductIngridients/ProductIngridients'
import cl from './EditProduct.module.css'

export default function EditProduct ({ item, ingridients, setDeleteModalOpen, setEditModalOpen }) {
  return (
    <li key={item.id} className={cl.product}>
      {
        <div className={cl.product_link_container}>
          <ProductImage item={item} />
          <h3>{item.name}</h3>
          <ProductIngridients item={item} ingridients={ingridients} />
          <ProductFooter weight={item.weight} price={item.price} />
          <div className={cl.product_edit_buttons_container}>
            <div
              className={cl.edit_button_container}
              onClick={() => {
                setEditModalOpen({ ...item, state: true })
              }}
            >
              <FaEdit className={cl.edit_button} />
              <span className={cl.button_tooltip_text}>Редактировать</span>
            </div>
            <div
              className={cl.edit_button_container}
              onClick={() => {
                setDeleteModalOpen({ id: item.id ,name: item.name, state: true })
              }}
            >
              <FaTrash className={cl.edit_button} />
              <span className={cl.button_tooltip_text}>Удалить</span>
            </div>
          </div>
        </div>
      }
    </li>
  )
}
