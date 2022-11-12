"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.put = exports.del = exports.post = exports.get = exports.router = void 0;
var express_1 = require("express");
exports.router = (0, express_1.Router)();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
exports.del = getRequestDecorator('delete');
exports.put = getRequestDecorator('put');
function controller(target) {
    for (var key in target.prototype) {
        // 获取对应的path
        var path = Reflect.getMetadata("path", target.prototype, key);
        // 获取对应的请求方式
        var method = Reflect.getMetadata("method", target.prototype, key);
        // 获取对应的方法
        var handler = target.prototype[key];
        if (path && handler && method) {
            exports.router[method](path, handler);
        }
    }
}
exports.controller = controller;
