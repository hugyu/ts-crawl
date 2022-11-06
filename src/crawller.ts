import superagent from "superagent";
// 对获取到的html文档进行操作
import cheerio from "cheerio";
interface CourseItem {
    title: string,
    count:number
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
        
  }
  // 获取原始的html文件
  async getRawHtml() {
    // 发送get请求
    const result = await superagent.get(this.url);
    this.getCourseInfo(result.text);
  }
  constructor() {
    this.getRawHtml();
  }
}
const crawller = new Crawller();
