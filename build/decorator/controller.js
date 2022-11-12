"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            // 获取对应的path
            var path = Reflect.getMetadata("path", target.prototype, key);
            // 获取对应的请求方式
            var method = Reflect.getMetadata("method", target.prototype, key);
            // 获取对应的方法
            var handler = target.prototype[key];
            // 获取中间件
            var middleware = Reflect.getMetadata("middleware", target.prototype, key);
            if (path && method) {
                var fullPath = root === "/" ? "".concat(path) : "".concat(root).concat(path);
                if (middleware) {
                    router_1.default[method](fullPath, middleware, handler);
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
