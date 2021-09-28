import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as ActionCreators from '../../Actions/actionCreator';
import { bindActionCreators } from 'redux';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ErrorModal from '../ErrorModal/ErrorModal';
import ProductsList from '../ProductsList/ProductsList';

function Products() {
  const dispatch = useDispatch();

  const {
    ingridientsActionGet,
    ingridientsActionClearError,
    productsActionGet,
    productsActionClearError,
  } = bindActionCreators(ActionCreators, dispatch);

  const [isErrorModalOpen, setErrorModalOpen] = useState({
    text: false,
    clearError: () => {},
  });

  const [products, isProductsFetch, isProductsError] = useSelector(
    ({ products }) => [products.products, products.isFetching, products.error]
  );

  const [ingridients, isIngridientsFetch, isIngridientsError] = useSelector(
    ({ ingridients }) => [
      ingridients.ingridients,
      ingridients.isFetching,
      ingridients.error,
    ]
  );
  useEffect(() => {
    if (isProductsError) {
      setErrorModalOpen({
        text: isProductsError,
        clearError: productsActionClearError,
      });
    }
    if (isIngridientsError) {
      setErrorModalOpen({
        text: isIngridientsError,
        clearError: ingridientsActionClearError,
      });
    }
    if (!ingridients) {
      ingridientsActionGet();
    }
    if (!products) {
      productsActionGet();
    }
  }, [isProductsError, isIngridientsError]);

  return isProductsFetch || isIngridientsFetch ? (
    <LoadSpinner />
  ) : isErrorModalOpen.text ? (
    <ErrorModal
      visible={isErrorModalOpen}
      setVisible={setErrorModalOpen}
      error={isErrorModalOpen.text}
      clearError={isErrorModalOpen.clearError}
    />
  ) : products ? (
    <ProductsList products={products} ingridients={ingridients} />
  ) : null;
}

export default Products;
