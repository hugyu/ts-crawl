// 引入核心模块 写入json文件
import fs from 'fs';
import path from 'path';
import superagent from "superagent";
// 对获取到的html文档进行操作
import cheerio from "cheerio";
interface CourseItem {
    title: string,
    count:number
}

interface CourseResult {
  time: number,
  data: CourseItem[]
}

interface JsonContent {
  [propName:number]:CourseItem[],
}
class Crawller {
  private secret = "secretKey";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

    getCourseInfo(html: string) {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos:CourseItem[]=[]
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc')
            // 取第一个
            const title = descs.eq(0).text()
            const count = parseInt(descs.eq(1).text().split('：')[1],10);
            courseInfos.push({title,count})
        })
        const result = {
            time: (new Date()).getTime(),
            data: courseInfos
        }
      console.log(result);
      return result;
        
  }
  
  generateJsonContent(courseResult: CourseResult) {
    const filePath = path.resolve(__dirname, '../data/course.json')
    let fileContent:JsonContent={}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      
    }
    fileContent[courseResult.time] = courseResult.data
    return fileContent
  }

  // 获取原始的html文件
  async getRawHtml() {
    // 发送get请求
    const result = await superagent.get(this.url);
    return result.text
  }

  async initSpiderProgress() {
    const filePath = path.resolve(__dirname, '../data/course.json')
    const html = await this.getRawHtml()
    const courseResult = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseResult)
    fs.writeFileSync(filePath,JSON.stringify(fileContent))
    
  }
  constructor() {
    this.initSpiderProgress();
  }
}
const crawller = new Crawller();
