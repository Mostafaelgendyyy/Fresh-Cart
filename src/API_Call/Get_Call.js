// src/utils/api.js
import axios from 'axios';

export const get = async (url,header) => {
  return await axios.get(url,header)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
};
