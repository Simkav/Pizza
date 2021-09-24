import CONSTANTS from "../constants";

class AuthApi {
  #_client;
  #_url;
  #_accessToken;

  constructor(client) {
    this.#_client = client;
    this.#_url = "auth/";
    this.#_accessToken = null;

    this.#_client.interceptors.request.use(this.requestInterceptor, (err) =>
      Promise.reject(err)
    );
    this.#_client.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorError
    );
  }
  signIn = async (data) => this.#_client.post(`${this.#_url}sign-in`, data);

  signUp = async (data) => this.#_client.post(`${this.#_url}sign-up`, data);

  refresh = async (data) => this.#_client.post(`${this.#_url}refresh`, data);

  logout = () => {
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    this.#_accessToken = null;
  };

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
    if (url.includes(this.#_url)) {
      const {
        data: {
          data: { tokens },
        },
      } = response;
      this._saveTokenPair(tokens);
    }
    return response;
  };

  responseInterceptorError = async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (status === 419 && refreshToken) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await this.refresh({ refreshToken });

      this._saveTokenPair(tokenPair);

      config.headers["Authorization"] = `Bearer ${tokenPair.accessToken}`;
      return this.#_client(config);
    }

    if (status === 401 && refreshToken) {
      this.logout();
    }

    return Promise.reject(error);
  }
}

export default AuthApi;
