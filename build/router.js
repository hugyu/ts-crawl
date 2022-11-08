"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawller_1 = __importDefault(require("./utils/crawller"));
const analyzer_1 = __importDefault(require("./utils/analyzer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./utils/util");
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)("", "请先登录"));
    }
};
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send(` <html>
        <body>
        <a href='/getData'>爬取内容</a>
        <a href='/showData'>展示内容</a>
       <a href='/logout'>退出</a>
        </body>
        </html>`);
    }
    else {
        res.send(`
    <html>
    <body>
    <form method="post" action="/login">
    <input type="password" name="password"/>
    <button>登录</button>
    </form>
    </body>
    </html>`);
    }
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json((0, util_1.getResponseData)(true));
    res.redirect("/");
});
router.post("/login", (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json((0, util_1.getResponseData)(false, "已经登录"));
    }
    else {
        if (password === "123") {
            if (req.session) {
                req.session.login = true;
                res.json((0, util_1.getResponseData)(true, "登录成功"));
            }
        }
        else {
            res.json((0, util_1.getResponseData)(false, "登录失败"));
        }
    }
});
router.get("/getData", checkLogin, (req, res) => {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = analyzer_1.default.getInstance();
    new crawller_1.default(url, analyzer);
    res.json((0, util_1.getResponseData)(true, "getData Successfully"));
});
router.get("/showData", checkLogin, (req, res) => {
    try {
        const position = path_1.default.resolve(__dirname, "../data/course.json");
        const result = fs_1.default.readFileSync(position, "utf-8");
        res.json((0, util_1.getResponseData)(JSON.parse(result)));
    }
    catch (error) {
        res.json((0, util_1.getResponseData)(false, "尚未爬取到内容"));
    }
});
exports.default = router;
