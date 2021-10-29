import EditProduct from '../EditProduct/EditProduct';
import cl from './EditProductsList.module.css';
import ProductModals from '../ProductModals/ProductModals';
import useModalsReducer from '../../../Hooks/useModalsReducer';
import { useMemo } from 'react';
import AddProductButton from '../AddProductButton/AddProductButton';

export default function EditProductsList ({ products, ingridients }) {
  const [modalsState, modalsDispatch] = useModalsReducer();

  return (
    <>
      <ul className={cl.products_container}>
        <AddProductButton modalsDispatch={modalsDispatch} />
        {useMemo(
          () =>
            products
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
              : null,
          [products],
        )}
      </ul>
      <ProductModals
        modalsState={modalsState}
        modalsDispatch={modalsDispatch}
      />
    </>
  );
}
