import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../../ErrorModal/ErrorModal';
import AddProductModal from '../AddProductModal/AddProductModal';
import { productsActionClearError } from '../../../Actions/actionCreator';
import DeleteProductModal from '../DeleteProductModal/DeleteProductModal';
import EditProductModal from '../EditProductModal/EditProductModal';

export default function ProductModals ({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch();
  const isError = useSelector(({ products }) => products.error);

  return (
    <>
      {isError ? (
        <ErrorModal
          error={isError}
          clearError={() => dispatch(productsActionClearError())}
        />
      ) : null}
      <AddProductModal
        addModalState={modalsState.addModal}
        modalsDispatch={modalsDispatch}
      />
      <DeleteProductModal
        deleteModalState={modalsState.deleteModal}
        modalsDispatch={modalsDispatch}
      />
      <EditProductModal
        editModalState={modalsState.editModal}
        modalsDispatch={modalsDispatch}
      />
    </>
  );
}
