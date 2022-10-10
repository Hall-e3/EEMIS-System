import axios from 'axios'

export const eemisApi = axios.create({
  baseURL: process.env.REACT_APP_API_GLOBAL_URL,
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
