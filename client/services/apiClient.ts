import { setToken, setRefreshToken, getAccessToken, getRefreshToken } from './../utils/tokens';
import axios from 'axios'



// interface QueueItem {
//   resolve: (value?: string | PromiseLike<string> | undefined) => void;
//   reject: (reason?: any) => void;
// }

interface RefreshTokenResponse {
  data: {
    token: string,
    refreshToken: string
  }
}

//para todas as requisições serverSideRendering do Next deve passar o context(ctx)
//para todas as requisições browser to backend (backend proprio) não passar context(ctx)

export function getApiClient(ctx?: any) {
  const token = getAccessToken(ctx)
  const refresh_token = getRefreshToken()
  const api = axios.create({
    baseURL: "http://localhost:5000/"
  })
  let isRefreshing = false;

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  api.interceptors.response.use(
    response => response,
    (async error => {
      const originalRequest = error.config
      
      if (!isRefreshing && !originalRequest._retry && error.response.status === 401) {
        originalRequest._retry = true
        isRefreshing = true
        const { data } = await api.post('/api/auth/refresh-token', {
          refresh_token
        })
        setToken(data.token)
        setRefreshToken(data.refreshToken)
        originalRequest.headers.Authorization = 'Bearer ' + data.token;
        return api(originalRequest);

      }
      return Promise.reject(error);

    })
  )

  return api;
}

