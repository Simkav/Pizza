import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
    if (!ingridients) {
      ingridientsActionGet();
    }
    if (!products) {
      productsActionGet();
    }
  }, []);

  return isProductsFetch || isIngridientsFetch ? (
    <LoadSpinner />
  ) : isProductsError || isIngridientsError ? (
    <ErrorModal
      error={isProductsError ? isProductsError : isIngridientsError}
      clearError={
        isProductsError ? productsActionClearError : ingridientsActionClearError
      }
    />
  ) : products ? (
    <ProductsList products={products} ingridients={ingridients} />
  ) : null;
}

export default Products;
