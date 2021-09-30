export default class ProductsCRUDApi {
  #_client
  #_url

  constructor (client) {
    this.#_client = client
    this.#_url = 'pizza/'
  }

  getProducts = async () => this.#_client.get(this.#_url)
}
