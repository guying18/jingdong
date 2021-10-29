import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      // console.log(response)
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      Headers: {
        'Content-Type': 'aplication/json'
      }
    }).then((response) => {
      // console.log(response)
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
