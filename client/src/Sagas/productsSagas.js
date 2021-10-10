import { put, call } from 'redux-saga/effects'
import ACTION from '../Actions/actionTypes'
import * as API from '../Api'

export function * getProductsSaga () {
  yield put({ type: ACTION.PRODUCTS_ACTION_GET_REQUEST })
  try {
    const {
      data: { data }
    } = yield API.ProductsCRUDApi.getProducts()
    yield put({ type: ACTION.PRODUCTS_ACTION_GET_SUCCESS, products: data })
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_GET_ERROR,
      error: e.response.data.error
    })
  }
}

export function * createProductSaga ({ data: { product } }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_POST_REQUEST })
  try {
    const newProduct = {
      ...product,
      ingredients: JSON.stringify(product.ingredients)
    }
    const {
      data: {
        data: { img, id }
      }
    } = yield API.ProductsCRUDApi.createProduct(newProduct)

    const newProductSuccess = {
      ...product,
      id: id,
      image: img,
      Ingredients: product.ingredients
    }
    yield put({
      type: ACTION.PRODUCTS_ACTION_POST_SUCCESS,
      product: newProductSuccess
    })
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_POST_ERROR,
      error: e.response.data.error
    })
  }
}

export function * removeProductSaga ({ id, products }) {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_REMOVE_REQUEST })
  try {
    const { status } = yield API.ProductsCRUDApi.removeProduct(id)
    if (status === 200) {
      const newProducts = yield products.filter(item => item.id !== id)
      yield put({
        type: ACTION.PRODUCTS_ACTION_REMOVE_SUCCESS,
        products: newProducts
      })
    }
    if (status === 400) {
      yield call(getProductsSaga)
    }
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_REMOVE_ERROR,
      error: e.response.data.error
    })
  }
}
export function * updateProductImageSaga ({ id, img }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_REQUEST })
  try {
    const { status } = yield API.ProductsCRUDApi.updateProductImage(id, img)
    if (status === 200) {
      yield put({
        type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_SUCCESS
      })
    }
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_ERROR,
      error: e.response.data.error
    })
  }
}

export function * updateProductIngredientsSaga ({ id, ingredients }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_REQUEST })
  try {
    const { status } = yield API.ProductsCRUDApi.updateProductIngredients(
      id,
      ingredients
    )
    if (status === 200) {
      yield put({
        type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_SUCCESS
      })
    }
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_ERROR,
      error: e.response.data.error
    })
  }
}
  }
}
