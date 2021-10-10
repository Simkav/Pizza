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
}
