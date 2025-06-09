import setCookie from "set-cookie-parser";
import libCookie from "cookie";

const mapAuthLogicFactory = ({ sync }: { sync: boolean }) => (proxyRes, req, res) => {
  const paths = [
    "/api/camomilla/auth/login//",
    "/api/camomilla/auth/login/",
    "/api/camomilla/auth/logout//",
    "/api/camomilla/auth/logout/"
  ]

  console.log("[INTEGRATIONS CAMOMILLA] Mapo Auth Factory", proxyRes, req.cookies, req.path, res)


  if (paths.includes(req.path)) {
    const cookies = setCookie.parse(proxyRes);
    const sessionid = cookies.find(c => c.name == "sessionid")
    const __mapo_session = cookies.find(c => c.name == "__mapo_session")
    if (sessionid && !__mapo_session) cookies.push({ ...sessionid, name: "__mapo_session" });
    proxyRes.headers["set-cookie"] = cookies
      .filter(cookie => sync || cookie.name !== "sessionid")
      .map(cookie => libCookie.serialize(cookie.name, cookie.value, cookie));
  }
}

export default mapAuthLogicFactory
