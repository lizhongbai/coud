//router 路由对象

//router 设置路由规则

const express = require('express')

const index = require('../controllers/index')
const user = require('../controllers/user')

//创建路由对象
const router = express.Router()
//导出模块
module.exports=router


//设置路由规则

//index.js 不需要登陆展示的功能
router.get('/',index.showIndex)

// user.js 登陆 注册  退出 
router
    .get('/signin',user.showSignin)
    .post('/signin',user.handleSignin)
    .get('/signup',user.showSignup)
    .post('/signup',user.handleSignup)
    .get('/signout',user.handleSignout)