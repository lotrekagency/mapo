import { IncomingMessage, ServerResponse } from "node:http";

type Cookie = {
  name: string;
  value: string;
  attributes: Record<string, string>;
};
export const parseCookies = (res: ServerResponse<IncomingMessage>) => {
  const cookies: Record<string, Cookie> = {};
  const setCookieHeader = res.getHeader("set-cookie");

  if (setCookieHeader && Array.isArray(setCookieHeader)) {
    setCookieHeader.forEach((cookieStr) => {
      const name = cookieStr.split("=")[0];
      const value = cookieStr.split("=")[1].split(";")[0];
      const attributes = cookieStr
        .split(";")
        .slice(1)
        .reduce((attrs, attr) => {
          const [key, val] = attr.trim().split("=");
          attrs[key] = val;
          return attrs;
        }, {} as Record<string, string>);
      const parsedCookie: Cookie = { name, value, attributes };
      cookies[name] = parsedCookie;
    });
  }
  return cookies;
};

export const serializeCookies = (cookies: Record<string, Cookie>): string[] => {
  return Object.values(cookies).map((cookie) => {
    const attrs = Object.entries(cookie.attributes)
      .map(([k, v]) => (v ? `${k}=${v}` : k))
      .join("; ");
    return `${cookie.name}=${cookie.value}; ${attrs}`;
  });
};
