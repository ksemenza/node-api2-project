import axios from 'axios';

export const axiosAuth = () => {

   return axios.create({
    baseURL: `http://localhost:9000/api/posts`,
    headers: {
       "Content-Type": "application/json"
    }
  });
};

export default axiosAuth