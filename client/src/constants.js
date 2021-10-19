const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env

const hostName = REACT_APP_BACKEND_HOST || 'localhost'
const serverPort = REACT_APP_BACKEND_PORT || 3001

const SUPPORTED_FORMATS = ['image/png', 'image/svg','image/jpeg']

export default {
  SUPPORTED_FORMATS: SUPPORTED_FORMATS,
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  BASE_URL: `http://${hostName}:${serverPort}/`,
  PUBLIC_PATH: `http://${hostName}:${serverPort}/public`
}
