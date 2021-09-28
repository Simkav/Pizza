const { API_HOSTNAME, API_PORT } = process.env

const hostName = API_HOSTNAME || 'localhost'
const serverPort = API_PORT || 3001

export default {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  BASE_URL: `http://${hostName}:${serverPort}/`,
  PUBLIC_PATH: `http://${hostName}:${serverPort}/public`
}
