import { defineBoot } from '#q-app/wrappers'
import { ConfigDict } from 'src/base/settings'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ 
  baseURL: 'https://127.0.0.1:8000',
  timeout:10000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    config.headers.Authorization = "Bearer " + localStorage.getItem(ConfigDict.jwt)
    return config
  },
  error => {
      return Promise.reject(error)
  }
)

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
