import { RequestHandler } from "express";
import router from "../router";
import { Methods } from "./request";

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      // 获取对应的path
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      // 获取对应的请求方式
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      // 获取对应的方法
      const handler = target.prototype[key];
      // 获取中间件
      const middleware: RequestHandler = Reflect.getMetadata(
        "middleware",
        target.prototype,
        key
      );

      if (path && method) {
        const fullPath = root === "/" ? `${path}` : `${root}${path}`;
        if (middleware) {
          router[method](fullPath, middleware, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
