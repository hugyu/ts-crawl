// 对获取到的html文档进行操作
import cheerio from "cheerio";
import fs from "fs";
interface CourseItem {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: CourseItem[];
}
interface CourseItem {
  title: string;
  count: number;
}
interface JsonContent {
  [propName: number]: CourseItem[];
}
export default class DellAnalyzer {
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $(".course-item");
    const courseInfos: CourseItem[] = [];
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
    console.log(result);
    return result;
  }
  private generateJsonContent(courseResult: CourseResult, filePath: string) {
    let fileContent: JsonContent = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseResult.time] = courseResult.data;
    return fileContent;
  }
  public analyze(html: string, filePath: string) {
    const courseResult = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseResult, filePath);
    return JSON.stringify(fileContent);
  }
}
