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

@controller("/api")
export class LoginController {
  static islogin(req: RequestWithBody): boolean {
    return !!(req.session ? req.session.login : false);
  }
  @get("/isLogin")
  isLogin(req: RequestWithBody, res: Response): void {
    const isLogin = LoginController.islogin(req);
    const result=getResponseData<boolean>(isLogin)
    res.json(result);
  }
  @post("/login")
  login(req: RequestWithBody, res: Response): void {
    const { password } = req.body;
    const isLogin = LoginController.islogin(req);
    if (isLogin) {
      res.json(getResponseData<boolean>(true));
    } else {
      if (password === "123") {
        if (req.session) {
          req.session.login = true;
          res.json(getResponseData<boolean>(true));
        }
      } else {
        res.json(getResponseData<boolean>(false, "登录失败"));
      }
    }
  }

  @get("/logout")
  logout(req: RequestWithBody, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<boolean>(true));
  }
}
