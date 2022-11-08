"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
// 处理post请求
app.use(express_1.default.urlencoded({ extended: false }));
// 写一个中间件
app.use((req, res, next) => {
    req.teacherName = 'sds';
    next();
});
app.use(router_1.default);
app.listen(7001, () => {
    console.log('server is running ');
});
