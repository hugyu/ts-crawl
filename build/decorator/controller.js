"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
            var middlewares = Reflect.getMetadata("middlewares", target.prototype, key);
            if (path && method) {
                var fullPath = root === "/" ? "".concat(path) : "".concat(root).concat(path);
                if (middlewares && middlewares.length) {
                    router_1.default[method].apply(router_1.default, __spreadArray(__spreadArray([fullPath], middlewares, false), [handler], false));
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
