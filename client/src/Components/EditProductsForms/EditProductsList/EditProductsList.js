import EditProduct from '../EditProduct/EditProduct';
import cl from './EditProductsList.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import ProductModals from '../ProductModals/ProductModals';
import useModalsReducer from '../../../Hooks/useModalsReducer';
import { openAddModal } from '../../../Actions/actionCreator';

export default function EditProductsList ({ products, ingridients }) {
  const [modalsState, modalsDispatch] = useModalsReducer();

  return (
    <div>
      <ul className={cl.products_container}>
        <li
          className={cl.edit_product_button}
          onClick={() => modalsDispatch(openAddModal())}
        >
          <FaPlusCircle />
        </li>
        {products
          ? products.map((item) => {
              return (
                <EditProduct
                  key={item.id}
                  item={item}
                  ingridients={ingridients}
                  modalsDispatch={modalsDispatch}
                />
              );
            })
          : null}
      </ul>
      <ProductModals
        modalsState={modalsState}
        modalsDispatch={modalsDispatch}
      />
    </div>
  );
}
