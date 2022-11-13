interface CourseItem {
    title: string;
    count: number;
  }
  interface Data {
    [key: string]: CourseItem[];
  }
declare namespace responseResult {
    export type isLogin = boolean;
    export type login = boolean;
    export type logout = boolean;
    export type getData = boolean;
    export type showData=boolean|Data
}