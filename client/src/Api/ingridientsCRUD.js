export default class IngridientsCRUDApi {
  #_client
  #_url

  constructor (client) {
    this.#_client = client
    this.#_url = 'ingredient/'
  }

  // TODO function getIngridientById for NEST 

  getIngridients = async () => this.#_client.get(this.#_url)

  createIngridient = async data => this.#_client.post(this.#_url, data)

  removeIngridient = async id => this.#_client.delete(this.#_url + id)

  updateIngridient = async (id, data) =>
    this.#_client.patch(this.#_url + id, { name: data })
}
