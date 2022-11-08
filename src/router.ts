import { Request, Response, Router } from "express";
import Crawller from "./crawller";
import DellAnalyzer from "./dellAnalyzer";
interface RequestWithBody extends Request {
    body: {
        [key:string]: string | undefined;
    }
}
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
    <body>
    <form method="post" action="/getData">
    <input type="password" name="password"/>
    <button>提交</button>
    </form>
    </body>
    </html>`);
});
router.post("/getData", (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  if (password === "123") {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crawller(url, analyzer);
    res.send("getData Successfully");
  } else {
    res.send(`${req.teacherName}password error`);
  }
});
export default router;
