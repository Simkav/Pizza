import { useDispatch, useSelector } from 'react-redux';
import * as ActionCreators from '../../Actions/actionCreator';
import { bindActionCreators } from 'redux';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ErrorModal from '../ErrorModal/ErrorModal';
import ProductsList from '../ProductsList/ProductsList';

export default function Products() {
  const dispatch = useDispatch();

  const {
    ingridientsActionClearError,
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
