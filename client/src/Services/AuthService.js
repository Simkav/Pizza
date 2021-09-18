import $api from "../Axios/Api";

export default async function RegisterService(object) {
  const resp = await $api.post("/users", object);
  localStorage.setItem("IsAuth", JSON.stringify(true));
  localStorage.setItem("UserObject", JSON.stringify(object));
  localStorage.setItem("AccessToken", resp.data.data.access);
  localStorage.setItem("RefreshToken", resp.data.data.refresh);

  return resp;
}
