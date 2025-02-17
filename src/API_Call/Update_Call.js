// src/utils/api.js
import axios from 'axios';

export const update = async (url,request,header) => {
  return await axios.put(url, request,header).then((data)=>{
    // console.log(data);
    return data;
  }).catch((err)=>{
    // console.log(err.response);
    return err.response;
  })
};