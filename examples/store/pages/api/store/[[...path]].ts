import { createProxyMiddleware } from "http-proxy-middleware";
import { SERVER_API_URL } from "src/contants";

export default createProxyMiddleware({
  target: SERVER_API_URL,
  changeOrigin: true,
  pathRewrite: { "^/api/store": "/" },
});

export const config = {
  api: {
    bodyParser: false, // enable POST requests
    externalResolver: true, // hide warning message
  },
};
