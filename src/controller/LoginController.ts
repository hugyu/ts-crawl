import { Request, Response } from "express";
import "reflect-metadata";
import { controller, get, post } from "../decorator/index";
import { getResponseData } from "../utils/util";
// 继承的接口 body属性上有key value值
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller('/')
export class LoginController {
  static islogin(req: RequestWithBody):boolean {
    return !!(req.session ? req.session.login : false)
  }
  @post("/login")
  login(req: RequestWithBody, res: Response):void {
    const { password } = req.body;
    const isLogin = LoginController.islogin(req);
    if (isLogin) {
      res.json(getResponseData(false, "已经登录"));
    } else {
      if (password === "123") {
        if (req.session) {
          req.session.login = true;
          res.json(getResponseData(true));
        }
      } else {
        res.json(getResponseData(false, "登录失败"));
      }
    }
  }

  @get("/logout")
  logout(req: RequestWithBody, res: Response):void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }
  @get("/")
  home(req: RequestWithBody, res: Response):void {
    const isLogin = LoginController.islogin(req);
    if (isLogin) {
      res.send(` <html>
        <body>
        <a href='/getData'>爬取内容</a>
        <a href='/showData'>展示内容</a>
       <a href='/logout'>退出</a>
        </body>
        </html>`);
    } else {
      res.send(`
    <html>
    <body>
    <form method="post" action="/login">
    <input type="password" name="password"/>
    <button>登录</button>
    </form>
    </body>
    </html>`);
    }
  }
}
