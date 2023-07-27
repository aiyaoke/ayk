import axios from "axios";
import { baseUrl } from "./config";
import { getToken, showMessage, redirectPath } from "./utils";

class HttpRequest {
  constructor(url = baseUrl) {
    this.baseUrl = url;
    this.whiteUrl = ["/user/getPublicKey", "/user/loginWithCode"];
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 15000
    };
    return config;
  }

  interceptors(instance, options) {
    instance.interceptors.request.use(
      config => {
        let { url } = options;
        !this.whiteUrl.includes(url) && (config.headers.token = getToken());
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      ({ data }) => {
        let { msg } = data;
        if (data.msg) {
          showMessage("error", msg);
          if (data.msg === "Please login！") {
            showMessage("error", msg);
            redirectPath("/");
          }
        }
        if (typeof data == "string") {
          data = {
            data
          };
        }
        return data;
      },
      error => {
        if (error.isAxiosError) {
          showMessage("error", error.message);
        } else {
          showMessage("error", error.msg);
        }
        return {};
      }
    );
  }

  request(options) {
    let mergeOptions = {
      ...options,
      ...this.getInsideConfig()
    };
    const instance = axios.create();
    this.interceptors(instance, mergeOptions);
    return instance(mergeOptions);
  }
}

export default HttpRequest;
