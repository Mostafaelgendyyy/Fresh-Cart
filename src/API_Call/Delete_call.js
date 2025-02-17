import axios from 'axios';

export const _delete = async (url,header) => {
  return await axios.delete(url,header)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
};
