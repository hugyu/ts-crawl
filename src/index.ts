import express,{Request,Response,NextFunction} from 'express'
import router from './router'
const app = express()
// 处理post请求
app.use(express.urlencoded({ extended: false }))
// 写一个中间件
app.use((req: Request, res: Response, next: NextFunction) => {
    req.teacherName = 'sds'
    next()
})
    
app.use(router)
app.listen(7001, () => {
    console.log('server is running ');
    
}) 