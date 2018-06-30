//router 路由对象

//router 设置路由规则

const express = require('express')

const index = require('../controllers/index')
const user = require('../controllers/user')
const topicCtrl = require('../controllers/topic')

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

// 3 topic.js 
router
  .get('/topic/create', topicCtrl.showCreate)
  .post('/topic/create', topicCtrl.handleCreate)
  .get('/topic/:topicID', topicCtrl.showTopic)
  .get('/topic/:topicID/edit', topicCtrl.showEdit)
  .post('/topic/:topicID/edit', topicCtrl.handleEdit)
  .get('/topic/:topicID/delete', topicCtrl.handleDelete)