import { put, call, select, fork } from 'redux-saga/effects';
import ACTION from '../Actions/actionTypes';
import * as API from '../Api';

export function* getProductsSaga() {
  yield put({ type: ACTION.PRODUCTS_ACTION_GET_REQUEST });
  try {
    const { data } = yield API.ProductsCRUDApi.getProducts();

    const productsArray = data.reduce((acc, item) => {
      acc.push({ ...item, ingredients: item.ingredients.map((v) => v.id) });
      return acc;
    }, []);

    yield put({
      type: ACTION.PRODUCTS_ACTION_GET_SUCCESS,
      products: productsArray,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.PRODUCTS_ACTION_GET_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* createProductSaga({ data: { product } }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_POST_REQUEST });
  try {
    const newProduct = {
      ...product,
      ingredients: product.ingredients,
    };
    const {
      data: { Pizza, ingredients },
    } = yield API.ProductsCRUDApi.createProduct(newProduct);

    const newProductSuccess = {
      name: Pizza.name,
      id: Pizza.id,
      image: Pizza.image,
      ingredients: ingredients.map((v) => v.id),
      price: Pizza.price,
      weight: Pizza.weight,
    };
    yield put({
      type: ACTION.PRODUCTS_ACTION_POST_SUCCESS,
      product: newProductSuccess,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.PRODUCTS_ACTION_POST_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* removeProductSaga({ id }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_REMOVE_REQUEST });
  try {
    const { status } = yield API.ProductsCRUDApi.removeProduct(id);
    if (status === 200) {
      const products = yield select(({ products }) => products.products);
      const newProducts = yield products.filter((item) => item.id !== id);
      yield put({
        type: ACTION.PRODUCTS_ACTION_REMOVE_SUCCESS,
        products: newProducts,
      });
    }
    if (status === 400) {
      yield call(getProductsSaga);
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.PRODUCTS_ACTION_REMOVE_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* updateProductSaga({ newProduct }) {
  const newProductId = newProduct.id;
  const products = yield select(({ products }) => products.products);

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((n, i) => n === b[i]);

  for (let item of products) {
    if (item.id === newProductId) {
      if (!item.image.includes(newProduct.image.name)) {
        yield fork(updateProductImageSaga, {
          id: newProductId,
          newImage: newProduct.image,
        });
      }
      if (!compareArrays(item.ingredients, newProduct.ingredients)) {
        yield fork(updateProductIngredientsSaga, {
          id: newProductId,
          ingridients: newProduct.ingredients,
        });
      }
      if (
        item.name !== newProduct.name ||
        item.price !== newProduct.price ||
        item.weight !== newProduct.weight
      ) {
        yield fork(updateProductOtherDescriptionSaga, {
          id: newProductId,
          newName: newProduct.name,
          newPrice: newProduct.price,
          newWeight: newProduct.weight,
        });
      }
    }
  }
}

export function* updateProductImageSaga({ id, newImage }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_REQUEST });
  try {
    const {
      data: { src },
    } = yield API.ProductsCRUDApi.updateProductImage(id, newImage);

    const currentProducts = yield select(({ products }) => products.products);

    const editedProducts = currentProducts.map((item) => {
      if (item.id === id) {
        const editedItem = { ...item, image: src };
        return editedItem;
      } else return item;
    });

    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_SUCCESS,
      products: editedProducts,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* updateProductIngredientsSaga({ id, ingridients }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_REQUEST });
  try {
    const { data } = yield API.ProductsCRUDApi.updateProductIngredients(
      id,
      ingridients,
    );

    const currentProducts = yield select(({ products }) => products.products);

    const editedProducts = currentProducts.map((item) => {
      if (item.id === id) {
        const editedItem = { ...item, ingredients: data.map((v) => v.id) };
        return editedItem;
      } else return item;
    });

    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_SUCCESS,
      products: editedProducts,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* updateProductOtherDescriptionSaga({
  id,
  newName,
  newPrice,
  newWeight,
}) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_REQUEST });
  try {
    const {
      data: { name, price, weight },
    } = yield API.ProductsCRUDApi.updateProductOther(id, {
      name: newName,
      price: newPrice,
      weight: newWeight,
    });

    const currentProducts = yield select(({ products }) => products.products);

    const editedProducts = currentProducts.map((item) => {
      if (item.id === id) {
        const editedItem = { ...item, name, price, weight };
        return editedItem;
      } else return item;
    });

    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_SUCCESS,
      products: editedProducts,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_ERROR,
      error: e.response.data.message,
    });
  }
}
