import { responseInterceptor } from "http-proxy-middleware";
import { parseCookies, serializeCookies } from "./setCookieParser";

const AUTH_PATHS = {
  login: "/api/camomilla/auth/login",
  logout: "/api/camomilla/auth/logout",
};

const mapAuthLogicFactory = ({ sync }: { sync: boolean }) =>
  responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    const requestPath: string = (req.url?.split("?")[0] || "").replace(/\/+$/, "");
    if (Object.values(AUTH_PATHS).includes(requestPath)) {
      const cookies = parseCookies(res);
      const { sessionid, __mapo_session } = cookies;
      if (sessionid && !__mapo_session)
        cookies.__mapo_session = { ...sessionid, name: "__mapo_session" };
      if (!sync) delete cookies.sessionid;
      res.setHeader("set-cookie", serializeCookies(cookies));
      if (requestPath === AUTH_PATHS.login && res.statusCode === 200) {
        return JSON.stringify({ token: cookies.__mapo_session?.value || "" });
      }
    }
    return responseBuffer;
  });

export default mapAuthLogicFactory;
