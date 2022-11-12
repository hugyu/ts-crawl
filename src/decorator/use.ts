import { RequestHandler } from "express";
import { CrawllerController } from "../controller/CrawllerController";
import { LoginController } from "../controller/LoginController";

export function use(middleware: RequestHandler) {
  return function (target: LoginController | CrawllerController, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
