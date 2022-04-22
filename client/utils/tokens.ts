import { parseCookies, setCookie } from "nookies"


export const setToken = (token: string)=> {
  // console.log(token)
  setCookie(undefined, 'beru.access_token', token, {
    maxAge: 60 * 15, //15 min
  })
  return;
}

export const setRefreshToken = (refresh_token: string)=> {
  setCookie(undefined, 'beru.refresh_token', refresh_token, {
    maxAge: 60 * 60 * 24 * 7, //7 days
  })
  return;
}

export const getAccessToken = (ctx?: any)=> {
  const {'beru.access_token': token} = parseCookies(ctx)

  return token
}

export const getRefreshToken = ()=> {
  const {'beru.refresh_token': refresh_token} = parseCookies()

  return refresh_token
}