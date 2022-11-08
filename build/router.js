"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawller_1 = __importDefault(require("./crawller"));
const dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('hello world');
});
router.get('/getData', (req, res) => {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = dellAnalyzer_1.default.getInstance();
    new crawller_1.default(url, analyzer);
    res.send('getData Successfully');
});
exports.default = router;
