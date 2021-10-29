import { useDispatch } from 'react-redux';
import * as ActionCreators from '../../Actions/actionCreator';
import { bindActionCreators } from 'redux';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ErrorModal from '../ErrorModal/ErrorModal';
import ProductsList from '../ProductsList/ProductsList';
import { memo } from 'react';
import useShallowEqualSelector from '../../Hooks/useShallowEqualSelector';

export default memo(function Products () {
  const dispatch = useDispatch();

  const {
    ingridientsActionClearError,
    productsActionClearError,
  } = bindActionCreators(ActionCreators, dispatch);

  const [products, isProductsFetch, isProductsError] = useShallowEqualSelector(
    ({ products }) => [products.products, products.isFetching, products.error],
  );

  const [
    ingridients,
    isIngridientsFetch,
    isIngridientsError,
  ] = useShallowEqualSelector(({ ingridients }) => [
    ingridients.ingridients,
    ingridients.isFetching,
    ingridients.error,
  ]);

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
});
