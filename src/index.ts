import express from 'express'
import cookieSession from 'cookie-session'
import router from './router'
import './controller/LoginController'
import './controller/CrawllerController'

const app = express()
// 处理post请求
app.use(express.urlencoded({ extended: false }))
// 使用cookie-session中间件
app.use(cookieSession({
    name: "session",
    keys: ['teacher dell'],
    maxAge:24*60*60*1000
}))
app.use(router)
app.listen(7001, () => {
    console.log('server is running ');
    
}) 