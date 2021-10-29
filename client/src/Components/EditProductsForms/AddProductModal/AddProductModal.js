import cl from './AddProductModal.module.css';
import cn from 'classnames';
import { FaTimes, FaCheck } from 'react-icons/fa';
import Modal from '../../Modal/Modal';
import UploadImageForm from '../UploadImageForm/UploadImageForm';
import IngridientsChooseForm from '../IngridientsChooseForm/IngridientsChooseForm';
import { newProductSchema } from '../../../Validations/NewProductSchema';
import { useFormik } from 'formik';
import { memo, useLayoutEffect } from 'react';
import { productsActionCreate } from '../../../Actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { NewProductFormInputItems } from '../../../Helpers/NewProductFormInputItems';
import EditProductInput from '../EditProductInput/EditProductInput';
import {
  onCloseAddModal,
  onAddModalClosed,
} from '../../../Actions/actionCreator';

export default memo(function AddProductModal ({
  addModalState,
  modalsDispatch,
}) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (!addModalState.state && addModalState.closed) {
      NewProductFormik.resetForm();
    }
  }, [addModalState]);

  const products = useSelector(({ products }) => products.products);

  const NewProductFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: products ? products.map((item) => item.name) : null,
      image: '',
      name: '',
      ingredients: [],
      weight: '',
      price: '',
    },
    onSubmit: (data) => {
      const newProduct = Object.fromEntries(
        Object.entries(data).filter((item) => item[0] !== 'products'),
      );
      dispatch(productsActionCreate({ product: newProduct }));
      handleClose();
    },
    validationSchema: newProductSchema,
  });

  const handleClose = () => {
    modalsDispatch(onCloseAddModal());
  };

  const handleClosed = () => {
    modalsDispatch(onAddModalClosed());
  };

  return (
    <Modal
      visible={addModalState.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <form
        className={cl.add_product_window}
        onSubmit={NewProductFormik.handleSubmit}
      >
        <h3 className={cl.modal_title}>Добавить продукт</h3>
        <div className={cl.add_product_row}>
          <UploadImageForm NewProductFormik={NewProductFormik} />
          <IngridientsChooseForm NewProductFormik={NewProductFormik} />
          <div className={cl.inputs_fields_container}>
            {NewProductFormInputItems.map((item) => (
              <EditProductInput
                key={item.name}
                NewProductFormik={NewProductFormik}
                item={item}
              />
            ))}
          </div>
        </div>
        <div className={cl.add_window_buttons_container}>
          <button
            type={'submit'}
            className={cn(cl.add_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </button>
          <div
            className={cn(cl.add_window_button, cl.cancel)}
            onClick={() => handleClose()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </form>
    </Modal>
  );
});
