const mapCookiesFactory = ({ sync }: { sync: boolean }) => (req, res, next) => {

  console.log("[INTEGRATIONS CAMOMILLA] Mapo Cookies Factory", req.cookies, req.path)

  const { csrftoken, __mapo_session } = req.cookies
  if (__mapo_session) req.cookies.sessionid = __mapo_session
  if (csrftoken && req.path !== "/auth/login") req.headers['X-CSRFToken'] = csrftoken
  if (!sync || req.path == "/auth/logout") req.headers['cookie'] = Object.keys(req.cookies).map(k => `${k}=${req.cookies[k]}`).join(";")
  if (req.path == "/auth/login"){
    delete req.cookies.sessionid
    delete req.cookies.__mapo_session
    delete req.cookies.csrftoken
    req.headers['cookie'] = Object.keys(req.cookies).map(k => `${k}=${req.cookies[k]}`).join(";")
  }
  next()
}

export default mapCookiesFactory
