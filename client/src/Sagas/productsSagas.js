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

export function * updateProductSaga ({ newProduct, products }) {
  const newProductSend = {
    id: newProduct.id,
    img: newProduct.img,
    name: newProduct.name,
    Ingredients: newProduct.ingredients,
    price: newProduct.price,
    weight: newProduct.weight
  }

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((n, i) => n === b[i])

  for (let item of products) {
    if (item.id === newProduct.id) {
      if (!item.image.includes(newProduct.img.name)) {
        yield call(updateProductImageSaga, {
          id: newProductSend.id,
          img: newProductSend.img
        })
      }
      if (!compareArrays(item.Ingredients, newProduct.ingredients)) {
        yield call(updateProductIngredientsSaga, {
          id: newProductSend.id,
          ingredients: newProductSend.Ingredients
        })
      }
      if (
        item.name !== newProduct.name ||
        item.price !== newProduct.price ||
        item.weight !== newProduct.weight
      ) {
        yield call(updateProductOtherDescriptionSaga, {
          id: newProductSend.id,
          name: newProductSend.name,
          price: newProductSend.price,
          weight: newProductSend.weight
        })
      }
    }
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

export function * updateProductOtherDescriptionSaga ({
  id,
  name,
  price,
  weight
}) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_REQUEST })
  try {
    const { status } = yield API.ProductsCRUDApi.updateProductOther(id, {
      name,
      price,
      weight
    })
    if (status === 200) {
      yield put({
        type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_SUCCESS
      })
    }
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_ERROR,
      error: e.response.data.error
    })
  }
}
