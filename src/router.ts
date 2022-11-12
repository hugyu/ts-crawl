// import { Request, Response, Router, NextFunction } from "express";
// import Crawller from "./utils/crawller";
// import Analyzer from "./utils/analyzer";
// import fs from "fs";
// import path from "path";
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
// router.get("/", () => {});
// router.get("/logout", (req: Request, res: Response) => {
//   if (req.session) {
//     req.session.login = undefined;
//   }
//   res.json(getResponseData(true));
//   res.redirect("/");
// });
// router.post("/login", (req: RequestWithBody, res: Response) => {
//   const { password } = req.body;
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     res.json(getResponseData(false, "已经登录"));
//   } else {
//     if (password === "123") {
//       if (req.session) {
//         req.session.login = true;
//         res.json(getResponseData(true, "登录成功"));
//       }
//     } else {
//       res.json(getResponseData(false, "登录失败"));
//     }
//   }
// });
// router.get("/getData", checkLogin, (req: RequestWithBody, res: Response) => {
//   const secret = "secretKey";
//   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
//   const analyzer = Analyzer.getInstance();
//   new Crawller(url, analyzer);
//   res.json(getResponseData(true, "getData Successfully"));
// });
// router.get("/showData", checkLogin, (req: RequestWithBody, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, "../data/course.json");
//     const result = fs.readFileSync(position, "utf-8");
//     res.json(getResponseData(JSON.parse(result)));
//   } catch (error) {
//   res.json(getResponseData(false, "尚未爬取到内容"));
//    }
// });
// export default router;
