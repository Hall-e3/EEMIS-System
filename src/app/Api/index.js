import axios from 'axios'

export const eemisApi = axios.create({
  baseURL:"https://eemis-api.herokuapp.com/eemis",
});

export const TokenConfig = (getState) => {
  const token = getState().auth.token;
  const Config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    Config.headers["Authorization"] = `JWT ${token}`;
  }

  return Config;
};
