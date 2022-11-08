import {Request,Response, Router } from 'express'
import Crawller from './crawller'
import DellAnalyzer from './dellAnalyzer'

const router = Router()
router.get('/', (req:Request, res:Response) => {
    res.send('hello world')
})
router.get('/getData', (req:Request, res:Response) => {
    const secret = "secretKey"
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance()
   new Crawller(url, analyzer);
    res.send('getData Successfully')
})
export default router

