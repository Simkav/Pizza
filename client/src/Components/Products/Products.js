import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  ingridientsActionGet,
  productsActionGet,
} from '../../Actions/actionCreator';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ErrorModal from '../ErrorModal/ErrorModal';
import ProductsList from '../ProductsList/ProductsList';

function Products() {
  const dispatch = useDispatch();

  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

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
      setErrorModalOpen(isProductsError);
    }
    if (isIngridientsError) {
      setErrorModalOpen(isIngridientsError);
    }
    if (!ingridients) {
      dispatch(ingridientsActionGet());
    }
    if (!products) {
      dispatch(productsActionGet());
    }
  }, [isProductsError, isIngridientsError]);

  return isProductsFetch || isIngridientsFetch ? (
    <LoadSpinner />
  ) : isErrorModalOpen ? (
    <ErrorModal
      visible={isErrorModalOpen}
      setVisible={setErrorModalOpen}
      error={isErrorModalOpen}
    />
  ) : products ? (
    <ProductsList products={products} ingridients={ingridients} />
  ) : null;
}

export default Products;
