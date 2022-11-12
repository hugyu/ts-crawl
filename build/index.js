"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var router_1 = __importDefault(require("./router"));
require("./controller/LoginController");
require("./controller/CrawllerController");
var app = (0, express_1.default)();
// 处理post请求
app.use(express_1.default.urlencoded({ extended: false }));
// 使用cookie-session中间件
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running ');
});
