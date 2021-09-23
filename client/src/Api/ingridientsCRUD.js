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

  refresh = async (data) => this.#_client.post("auth/refresh", data);

  requestInterceptor = (config) => {
    if (this.#_accessToken) {
      config.headers["Authorization"] = `Bearer ${this.#_accessToken}`;
    }
    return config;
  };

  _saveTokenPair = ({ refresh, access }) => {
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
    this.#_accessToken = access;
  };

  responseInterceptor = async (response) => {
    const {
      config: { url },
    } = response;
    if (url.includes(this._url)) {
      const {
        data: {
          data: { tokenPair },
        },
      } = response;
      this._saveTokenPair(tokenPair);
    }
    return response;
  };

  responseInterceptorError = async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (status === 418 && refreshToken) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await this.refresh({ refreshToken });

      this._saveTokenPair(tokenPair);

      config.headers["Authorization"] = `Bearer ${tokenPair.accessToken}`;
      return this.#_client(config);
    }

    return Promise.reject(error);
  };
}

export default IngridientsCRUDApi;
