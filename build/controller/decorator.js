"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.del = exports.post = exports.get = void 0;
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["delete"] = "delete";
    Methods["put"] = "put";
})(Methods || (Methods = {}));
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
exports.del = getRequestDecorator(Methods.delete);
exports.put = getRequestDecorator(Methods.put);
