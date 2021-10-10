export default class ProductsCRUDApi {
  #_client
  #_url

  constructor (client) {
    this.#_client = client
    this.#_url = 'pizza/'
  }

  getProducts = async () => this.#_client.get(this.#_url)

  createProduct = async data => {
    const formData = new FormData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    console.log(data)
    for (const prop in data) {
      formData.append(`${prop}`, data[prop])
    }
    return this.#_client.post(this.#_url, formData, config)
  }

  removeProduct = async id => this.#_client.delete(this.#_url + id)

  getProductImage = async img => {
    return this.#_client
      .get(CONSTANTS.PUBLIC_PATH + img, {
        responseType: 'blob'
      })
      .then(resp => {
        const newFile = new File([resp.data], img.match('\\d..*'), {
          type: resp.data.type
        })
        return newFile
      })
  }

  updateProductImage = async (id, img) => {
    const formData = new FormData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    formData.append('img', img)
    return this.#_client.patch(this.#_url + id + '/image', formData, config)
  }
}
