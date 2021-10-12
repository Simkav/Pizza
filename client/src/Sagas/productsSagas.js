import { put, call, select } from 'redux-saga/effects'
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

export function * removeProductSaga ({ id }) {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_REMOVE_REQUEST })
  try {
    const { status } = yield API.ProductsCRUDApi.removeProduct(id)
    if (status === 200) {
      const products = yield select(({products}) => products.products);
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

export function * updateProductSaga ({ newProduct }) {
  const newProductSend = {
    id: newProduct.id,
    img: newProduct.img,
    name: newProduct.name,
    Ingredients: newProduct.ingredients,
    price: newProduct.price,
    weight: newProduct.weight
  }

  const products = yield select(({products}) => products.products);

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((n, i) => n === b[i])

  for (let item of products) {
    if (item.id === newProduct.id) {
      if (!item.image.includes(newProduct.img.name)) {
        yield call(updateProductImageSaga, {
          id: newProductSend.id,
          image: newProductSend.img
        })
      }
      if (!compareArrays(item.Ingredients, newProduct.ingredients)) {
        yield call(updateProductIngredientsSaga, {
          id: newProductSend.id,
          ingridients: newProductSend.Ingredients
        })
      }
      if (
        item.name !== newProduct.name ||
        item.price !== newProduct.price ||
        item.weight !== newProduct.weight
      ) {
        yield call(updateProductOtherDescriptionSaga, {
          id: newProductSend.id,
          newName: newProductSend.name,
          newPrice: newProductSend.price,
          newWeight: newProductSend.weight
        })
      }
    }
  }
}

export function * updateProductImageSaga ({ id, image }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_REQUEST })
  try {
    const {
      data: {
        data: { img }
      }
    } = yield API.ProductsCRUDApi.updateProductImage(id, image)

    const currentProducts = yield select(({products}) => products.products);

    const editedProducts = currentProducts.map(item => {
      if (item.id === id) {
        const editedItem = { ...item, image: img }
        return editedItem
      } else return item
    })

    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_SUCCESS,
      products: editedProducts
    })
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_ERROR,
      error: e.response.data.error
    })
  }
}

export function * updateProductIngredientsSaga ({ id, ingridients }) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_REQUEST })
  try {
    const {
      data: {
        data: { ingredients }
      }
    } = yield API.ProductsCRUDApi.updateProductIngredients(id, ingridients)

    const currentProducts = yield select(({products}) => products.products);

    const editedProducts = currentProducts.map(item => {
      if (item.id === id) {
        const editedItem = { ...item, Ingredients: ingredients.map(v => v.id) }
        return editedItem
      } else return item
    })

    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_SUCCESS,
      products: editedProducts
    })
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
  newName,
  newPrice,
  newWeight
}) {
  yield put({ type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_REQUEST })
  try {
    const {
      data: {
        data: { name, price, weight }
      }
    } = yield API.ProductsCRUDApi.updateProductOther(id, {
      name: newName,
      price: newPrice,
      weight: newWeight
    })

    const currentProducts = yield select(({products}) => products.products);

    const editedProducts = currentProducts.map(item => {
      if (item.id === id) {
        const editedItem = { ...item, name, price, weight }
        return editedItem
      } else return item
    })

    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_SUCCESS,
      products: editedProducts
    })
  } catch (e) {
    console.log(e)
    yield put({
      type: ACTION.PRODUCTS_ACTION_UPDATE_OTHER_ERROR,
      error: e.response.data.error
    })
  }
}
