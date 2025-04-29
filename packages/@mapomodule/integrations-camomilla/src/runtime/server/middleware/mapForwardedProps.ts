import { fromNodeMiddleware } from "#imports";

let referer: URL | undefined;

export default fromNodeMiddleware((req, res, next) => {
  try {
    referer = req.headers.referer ? new URL(req.headers.referer) : referer
    req.headers['x-Forwarded-Host'] = referer?.host || ""
    req.headers['x-Forwarded-Proto'] = (referer?.protocol || "").replace(/:+$/, '')
  } catch (_) { }
  next()
})
