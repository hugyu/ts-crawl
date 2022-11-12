import { RequestHandler } from "express";
import { CrawllerController } from "../controller/CrawllerController";
import { LoginController } from "../controller/LoginController";

// 实现使用多个中间件
export function use(middleware: RequestHandler) {
  return function (target: LoginController | CrawllerController, key: string) {
    const originMiddlewares = Reflect.getMetadata("middlewares", target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata("middleware", originMiddlewares, target, key);
  };
}
