"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 对获取到的html文档进行操作
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class DellAnalyzer {
    constructor() { }
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    }
    getCourseInfo(html) {
        const $ = cheerio_1.default.load(html);
        const courseItems = $(".course-item");
        const courseInfos = [];
        courseItems.map((index, element) => {
            const descs = $(element).find(".course-desc");
            // 取第一个
            const title = descs.eq(0).text();
            const count = parseInt(descs.eq(1).text().split("：")[1], 10);
            courseInfos.push({ title, count });
        });
        const result = {
            time: new Date().getTime(),
            data: courseInfos,
        };
        return result;
    }
    generateJsonContent(courseResult, filePath) {
        let fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseResult.time] = courseResult.data;
        return fileContent;
    }
    analyze(html, filePath) {
        const courseResult = this.getCourseInfo(html);
        const fileContent = this.generateJsonContent(courseResult, filePath);
        return JSON.stringify(fileContent);
    }
}
exports.default = DellAnalyzer;
