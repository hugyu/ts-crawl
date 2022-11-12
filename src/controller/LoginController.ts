import { Request, Response } from "express";
import "reflect-metadata";
import {get,controller} from './decorator'
// 继承的接口 body属性上有key value值
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller
export class LoginController {
  @get("/login")
  login(req: RequestWithBody, res: Response) {
    res.send("login")
  }
  @get("/")
  home(req: RequestWithBody, res: Response) {
    const isLogin = req.session ? req.session.login : false;
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
