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
  }
}
