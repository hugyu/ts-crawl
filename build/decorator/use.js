"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
// 实现使用多个中间件
function use(middleware) {
    return function (target, key) {
        var originMiddlewares = Reflect.getMetadata("middlewares", target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata("middleware", originMiddlewares, target, key);
    };
}
exports.use = use;
