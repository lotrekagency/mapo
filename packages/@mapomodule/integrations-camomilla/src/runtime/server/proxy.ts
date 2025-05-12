import { fromNodeMiddleware, useRuntimeConfig } from "#imports"

import express from "express"
import { responseInterceptor, createProxyMiddleware } from "http-proxy-middleware"
import cookieParser from "cookie-parser"

import mapAuthLogicFactory from "./utils/mapAuthLogicFactory"
import mapCookiesFactory from "./utils/mapCookiesFactory"

const app = express()
const config = useRuntimeConfig().camomilla

const {
  target,
  headers,
  changeOrigin,
  pathRewrite,
  onProxyRes,
  onProxyReq,
  use,
  base,
  syncCamomillaSession
} = config.configuration.api || {}

const baseUrl = base && (['/', 'http://', 'https://'].some(w => base.startsWith(w)) ? base : ("/" + base)).replace(/\/+$/, '') || ""

const authMiddleware = syncCamomillaSession ? mapAuthLogicFactory({ sync: true }) : mapAuthLogicFactory({ sync: false })
const cookiesMiddleware = syncCamomillaSession ? mapCookiesFactory({ sync: true }) : mapCookiesFactory({ sync: false })

const proxyOptions = {
  target,
  headers,
  changeOrigin: changeOrigin !== undefined ? changeOrigin : true,
  onProxyReq,
  onProxyRes: authMiddleware,
  pathRewrite: {
      [`^${baseUrl}/api/auth/login`]: '/api/camomilla/auth/login/',
      [`^${baseUrl}/api/auth/logout`]: '/api/camomilla/auth/logout/',
      [`^${baseUrl}/api/profiles/me`]: '/api/camomilla/users/current/',
      [`^${baseUrl}/api/media`]: '/api/camomilla/media',
      [`^${baseUrl}/api/media-folders`]: '/api/camomilla/media-folders',
      [`^${baseUrl}/api`]: '/api',
      ...pathRewrite
  },
}

if (typeof onProxyRes === 'function') {
  proxyOptions.onProxyRes = (proxyRes, req, res) => {
    authMiddleware(proxyRes, req, res)
    responseInterceptor(onProxyRes)(proxyRes, req, res)
  }
}

app.use(cookieParser());
app.use(cookiesMiddleware);
app.use(createProxyMiddleware(proxyOptions));

export default fromNodeMiddleware(app)
