import axios from "axios";
import CONSTANTS from "../constants";
import Auth from "./auth";
import IngridientsCRUD from "./ingridientsCRUD";

const $api = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

export const AuthApi = new Auth($api);
export const IngridientsCRUDApi = new IngridientsCRUD($api);
