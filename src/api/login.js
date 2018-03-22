import axios from 'axios'

function loginApi(url, params) {
  // params: 传入数据
  return new Promise((resolve, reject) => {
    axios.post(url, params)
    .then(res => {
      resolve(res);
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export default loginApi;
