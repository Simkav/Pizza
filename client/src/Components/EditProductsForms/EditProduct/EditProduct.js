import { FaEdit, FaTrash } from 'react-icons/fa';
import ProductFooter from '../../ProductForms/ProductFooter/ProductFooter';
import ProductImage from '../../ProductForms/ProductImage/ProductImage';
import ProductIngridients from '../../ProductForms/ProductIngridients/ProductIngridients';
import cl from './EditProduct.module.css';

export default function EditProduct({ item, ingridients, modalsDispatch }) {
  return (
    <li key={item.id} className={cl.product}>
      {
        <div className={cl.product_link_container}>
          <ProductImage item={item} />
          <h3>{item.name}</h3>
          <ProductIngridients item={item} ingridients={ingridients} />
          <ProductFooter item={item} />
          <div className={cl.product_edit_buttons_container}>
            <div
              className={cl.edit_button_container}
              onClick={() =>
                modalsDispatch({
                  type: 'OPEN_EDIT_MODAL',
                  payload: { product: item },
                })
              }
            >
              <FaEdit className={cl.edit_button} />
              <span className={cl.button_tooltip_text}>Редактировать</span>
            </div>
            <div
              className={cl.edit_button_container}
              onClick={() =>
                modalsDispatch({
                  type: 'OPEN_DELETE_MODAL',
                  payload: { id: item.id, name: item.name },
                })
              }
            >
              <FaTrash className={cl.edit_button} />
              <span className={cl.button_tooltip_text}>Удалить</span>
            </div>
          </div>
        </div>
      }
    </li>
  );
}
