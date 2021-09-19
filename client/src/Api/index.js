import axios from "axios";
import CONSTANTS from '../constants'

const $api = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

export const signUp = data => $api.post('/auth/sign-up,', data)
