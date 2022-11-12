import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import Crawller from "../utils/crawller";
import { getResponseData } from "../utils/util";
import { get, controller, use } from "./decorator";
import Analyzer from "../utils/analyzer";
import fs from "fs";
import path from "path";

// 继承的接口 body属性上有key value值
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData("", "请先登录"));
  }
};
@controller
export class CrawllerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response) {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crawller(url, analyzer);
    res.json(getResponseData(true, "getData Successfully"));
  }
    @get("/showData")
  @use(checkLogin)
      
  showData(req: Request, res: Response) {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf-8");
      res.json(getResponseData(JSON.parse(result)));
    } catch (error) {
      res.json(getResponseData(false, "尚未爬取到内容"));
    }
  }
}
