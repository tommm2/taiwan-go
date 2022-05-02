import axios from "axios";
import { getAuthorizationHeader } from "./getAuthorization";

export const ajax = (type, city = "", options = {}) => {
  const baseUrl = import.meta.env.VITE_APIPATH;

  let params = "";
  let url = baseUrl + "/" + type + (city !== "" ? `/${city}` : "") + "?";

  Object.keys(options).forEach((key) => {
    // 如果 options 裡有特定值，將值變更為 'contains(....)'
    if (options[key].id) {
      options[key] = `contains(${type}ID,'${options[key].id}')`;
    }

    if (options[key].classType) {
      options[key] = `contains(Class,'${options[key].classType}')`;
    }

    if (options[key].keyword) {
      options[
        key
      ] = `contains(${type}Name,'${options[key].keyword}') or contains(Address,'${options[key].keyword}')`;
    }

    params += `$${key}=${options[key]}&`;
  });

  params += "$format=JSON";

  return axios.get(url + params, { headers: getAuthorizationHeader() });
};
