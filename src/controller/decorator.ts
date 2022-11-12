import { Router } from "express";
export const router = Router();

enum Method {
  get = "get",
  post="post"
}

function getRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key)
    };
  }
}
export const get=getRequestDecorator('get')
export const post = getRequestDecorator('post')
export const del = getRequestDecorator('delete')
export const put = getRequestDecorator('put')

export function controller(target: any) {
  for (let key in target.prototype) {
    // 获取对应的path
    const path = Reflect.getMetadata("path", target.prototype, key);
    // 获取对应的请求方式
    const method:Method=Reflect.getMetadata("method", target.prototype, key)
    
    // 获取对应的方法
    const handler = target.prototype[key];
    if (path && handler && method) {
      router[method](path, handler);
    }
  }
}


