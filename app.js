const express = require('express')

const tmp = require('express-art-template')

const bodyparse = require('body-parser')

const app = express()

//引进router
const router = require('./routers/router')

app.listen(3000, ()=>{
    
    console.log('start')
})
//处理静态资源  下载bootstrap@3.3.7  jquery
app.use('/public',express.static('./public'))
app.use('/node_modules',express.static('./node_modules'))
//配置模板引擎
app.engine('html', tmp);

//配置bodyparser
app.use(bodyparse.urlencoded({ extended: false }));

app.use(router)