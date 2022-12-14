// 引入核心模块 写入json文件
import fs from 'fs';
import path from 'path';
import superagent from "superagent";
import DellAnalyzer from './analyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

export default class Crawller {
  private filePath=path.resolve(__dirname,'../../data/course.json')
  // 获取原始的html文件
  private async getRawHtml() {
    // 发送get请求
    const result = await superagent.get(this.url);
    return result.text
  }
  
  // 写文件
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath,JSON.stringify(content))
  }

  private async initSpiderProgress() {
    const html = await this.getRawHtml() 
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(JSON.parse(fileContent))
  }
  constructor(private url:string,private analyzer:Analyzer) {
    this.initSpiderProgress();
  } 
}
const secret = "secretKey"
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = DellAnalyzer.getInstance()

new Crawller(url, analyzer);
