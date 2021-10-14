import CONSTANTS from '../constants'

export default class AuthApi {
  #_client
  #_url
  #_accessToken

  constructor (client) {
    this.#_client = client
    this.#_url = 'auth/'
    this.#_accessToken = null

    this.#_client.interceptors.request.use(this.requestInterceptor, err =>
      Promise.reject(err)
    )
    this.#_client.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorError
    )
  }
  signIn = async data => this.#_client.post(`${this.#_url}login`, data)

  signUp = async data => this.#_client.post(`${this.#_url}register`, data)

  refresh = async data => this.#_client.post(`${this.#_url}refresh`, data)

  logout = () => {
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN)
    this.#_accessToken = null
  }

  requestInterceptor = config => {
    if (this.#_accessToken) {
      config.headers['Authorization'] = `Bearer ${this.#_accessToken}`
    }
    return config
  }

  _saveTokenPair = ({ refreshToken, accesToken }) => {
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken)
    this.#_accessToken = accesToken
  }

  responseInterceptor = async response => {
    const {
      config: { url }
    } = response
    if (url.includes(this.#_url)) {
      const {data} = response
      this._saveTokenPair(data)
    }
    return response
  }

  responseInterceptorError = async error => {
    const {
      config,
      response: { status }
    } = error
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN)
    if (status === 419 && refreshToken) {
      const {data} = await this.refresh({ token: refreshToken })

      this._saveTokenPair(data)

      config.headers['Authorization'] = `Bearer ${data.refreshToken}`
      return this.#_client(config)
    }

    if (status === 401 && refreshToken) {
      this.logout()
    }

    return Promise.reject(error)
  }
}
