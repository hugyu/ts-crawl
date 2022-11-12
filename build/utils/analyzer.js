"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 对获取到的html文档进行操作
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $(".course-item");
        var courseInfos = [];
        courseItems.map(function (index, element) {
            var descs = $(element).find(".course-desc");
            // 取第一个
            var title = descs.eq(0).text();
            var count = parseInt(descs.eq(1).text().split("：")[1], 10);
            courseInfos.push({ title: title, count: count });
        });
        var result = {
            time: new Date().getTime(),
            data: courseInfos,
        };
        return result;
    };
    DellAnalyzer.prototype.generateJsonContent = function (courseResult, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseResult.time] = courseResult.data;
        return fileContent;
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseResult = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseResult, filePath);
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
