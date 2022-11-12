import { Router } from "express";
export const router = Router();

export function get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("path", path, target, key);
  };
}
export function controller(target: any) {
  for (let key in target.prototype) {
    // 获取对应的path
    const path = Reflect.getMetadata("path", target.prototype, key);
    // 获取对应的方法
    const handler = target.prototype[key];
    if (path) {
      router.get(path, handler);
    }
  }
}


