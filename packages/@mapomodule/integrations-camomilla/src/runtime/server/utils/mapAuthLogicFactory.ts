import { responseInterceptor } from "http-proxy-middleware";
import { parseCookies, serializeCookies } from "./setCookieParser";

const mapAuthLogicFactory = ({ sync }: { sync: boolean }) =>
  responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    const paths = ["/api/camomilla/auth/login/", "/api/camomilla/auth/logout/"];
    const requestPath = req.url?.split("?")[0] || "";

    if (paths.includes(requestPath)) {
      const cookies = parseCookies(res);
      const sessionid = cookies["sessionid"];
      const __mapo_session = cookies["__mapo_session"];
      if (sessionid && !__mapo_session)
        cookies["__mapo_session"] = { ...sessionid, name: "__mapo_session" };
      if (!sync) delete cookies["sessionid"];
      res.setHeader("set-cookie", serializeCookies(cookies));
    }
    return responseBuffer;
  });

export default mapAuthLogicFactory;
