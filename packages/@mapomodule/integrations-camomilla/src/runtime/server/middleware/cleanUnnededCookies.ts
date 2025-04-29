import { fromNodeMiddleware } from "#imports";

const VALID_COOKIES = ["__mapo_session", "sessionid", "csrftoken"]

export default fromNodeMiddleware((req, res, next) => {
	try {
		req.headers['cookie'] =
			req.headers['cookie']?.split(";").filter(c => VALID_COOKIES.some(v => c.split("=")[0].includes(v))).join(";");
	} catch (_) { }
	next()
})
