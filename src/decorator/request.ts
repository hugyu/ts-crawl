import { CrawllerController } from "../controller/CrawllerController";
import { LoginController } from "../controller/LoginController";

export enum Methods {
  get = "get",
  post = "post",
  delete = "delete",
  put = "put",
}

function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (
      target: LoginController | CrawllerController,
      key: string
    ) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}
export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
export const del = getRequestDecorator(Methods.delete);
export const put = getRequestDecorator(Methods.put);
