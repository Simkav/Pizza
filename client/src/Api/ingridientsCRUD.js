import CONSTANTS from "../constants";

class IngridientsCRUDApi {
  #_client;
  #_url;
  #_accessToken;

  constructor(client) {
    this.#_client = client;
    this.#_url = "ingredient/";
    this.#_accessToken = null;

    this.#_client.interceptors.request.use(this.requestInterceptor, (err) =>
      Promise.reject(err)
    );
    this.#_client.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorError
    );
  }

  getIngridients = async () => this.#_client.get(this.#_url);

  createIngridient = async (data) => this.#_client.post(this.#_url, data);

  removeIngridient = async (id) => this.#_client.delete(this.#_url + id);

  updateIngridient = async (id, data) => this.#_client.put(this.#_url + id, data);
}

export default IngridientsCRUDApi;
