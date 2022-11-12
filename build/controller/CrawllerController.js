"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawllerController = void 0;
require("reflect-metadata");
var crawller_1 = __importDefault(require("../utils/crawller"));
var util_1 = require("../utils/util");
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var index_1 = require("../decorator/index");
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)("", "请先登录"));
    }
};
var CrawllerController = /** @class */ (function () {
    function CrawllerController() {
    }
    CrawllerController.prototype.getData = function (req, res) {
        var secret = "secretKey";
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=".concat(secret);
        var analyzer = analyzer_1.default.getInstance();
        new crawller_1.default(url, analyzer);
        res.json((0, util_1.getResponseData)(true, "getData Successfully"));
    };
    CrawllerController.prototype.showData = function (req, res) {
        try {
            var position = path_1.default.resolve(__dirname, "../../data/course.json");
            var result = fs_1.default.readFileSync(position, "utf-8");
            res.json((0, util_1.getResponseData)(JSON.parse(result)));
        }
        catch (error) {
            res.json((0, util_1.getResponseData)(false, "尚未爬取到内容"));
        }
    };
    __decorate([
        (0, index_1.get)("/getData"),
        (0, index_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawllerController.prototype, "getData", null);
    __decorate([
        (0, index_1.get)("/showData"),
        (0, index_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawllerController.prototype, "showData", null);
    CrawllerController = __decorate([
        (0, index_1.controller)('/')
    ], CrawllerController);
    return CrawllerController;
}());
exports.CrawllerController = CrawllerController;
