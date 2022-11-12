"use strict";
// import { Request, Response, Router, NextFunction } from "express";
// import Crawller from "./utils/crawller";
// import Analyzer from "./utils/analyzer";
// import { getResponseData } from "./utils/util";
// // 继承的接口 body属性上有key value值
// interface RequestWithBody extends Request {
//   body: {
//     [key: string]: string | undefined;
//   };
// }
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData("", "请先登录"));
//   }
// };
// const router = Router();
// router.get("/getData", checkLogin, (req: RequestWithBody, res: Response) => {
//   const secret = "secretKey";
//   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
//   const analyzer = Analyzer.getInstance();
//   new Crawller(url, analyzer);
//   res.json(getResponseData(true, "getData Successfully"));
// });
// router.get("/showData", checkLogin, (req: RequestWithBody, res: Response) => {
// });
// export default router;
