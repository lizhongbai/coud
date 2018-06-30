const express = require('express')

const tmp = require('express-art-template')

const bodyparse = require('body-parser')

const session = require('express-session')

const MySQLStore = require('express-mysql-session')(session);
const config = require('./config')

const app = express()

//引进router
const router = require('./routers/router')

app.listen(config.port, ()=>{ 
    
    console.log('start')
})
//处理静态资源  下载bootstrap@3.3.7  jquery
app.use('/public',express.static('./public'))
app.use('/node_modules',express.static('./node_modules'))
//配置模板引擎
app.engine('html', tmp);

//配置bodyparser
app.use(bodyparse.urlencoded({ extended: false }));

//把session 保存到mysql
var db = config.database;
var options = {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
};
 
var sessionStore = new MySQLStore(options);
//配置session
app.use(session({
    key: 'sessionid', //修改sessionid的名称
    secret: 'keyboard cat',//对sessionid进行加密
    resave: false,
    store: sessionStore,
    saveUninitialized: true 
  }))
  

app.use(router)