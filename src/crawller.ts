// 引入核心模块 写入json文件
import fs from 'fs';
import path from 'path';
import superagent from "superagent";
import DellAnalyzer from './dellAnalyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
  
}

class Crawller {
  private filePath=path.resolve(__dirname,'../data/course.json')
  // 获取原始的html文件
  async getRawHtml() {
    // 发送get请求
    const result = await superagent.get(this.url);
    return result.text
  }
  
  // 写文件
  writeFile(content: string) {
    fs.writeFileSync(this.filePath,JSON.stringify(content))
  }

  async initSpiderProgress() {
    const html = await this.getRawHtml()
    const fileContent=this.analyzer.analyze(html,this.filePath)
    this.writeFile(fileContent)
  }
  constructor(private url:string,private analyzer:Analyzer) {
    this.initSpiderProgress();
  }
}
const secret = "secretKey"
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = DellAnalyzer.getInstance()
new Crawller(url, analyzer);
