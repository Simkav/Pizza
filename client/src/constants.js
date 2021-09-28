const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

const hostName = REACT_APP_BACKEND_HOST || 'localhost';
const serverPort = REACT_APP_BACKEND_PORT || 3001;

export default {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  BASE_URL: `http://${hostName}:${serverPort}/`,
  PUBLIC_PATH: `http://${hostName}:${serverPort}/public`,
};
