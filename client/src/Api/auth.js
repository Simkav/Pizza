import CONSTANTS from "../constants";

class AuthApi {
  #_client;
  #_url;
  #_accessToken;

  constructor(client) {
    this.#_client = client;
    this.#_url = "auth/";
  }
  signIn = async (data) => this.#_client.post(`${this.#_url}sign-in`, data);

  signUp = async (data) => this.#_client.post(`${this.#_url}sign-up`, data);

  refresh = async (data) => this.#_client.post(`${this.#_url}refresh`, data);

  logout = () => {
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    this.#_accessToken = null;
  };
}

export default AuthApi;
