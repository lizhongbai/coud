


const db = require('./db.helper')
const userModel =require('../model/user')

const md5 = require('md5')
//展示登陆页面
//展示注册页面
//退出

exports.showSignin = (req,res) =>{
   res.render('signin.html')
}

//处理登陆界面
exports.handleSignin =(req,res) =>{
    // 验证用户输入
    //验证邮箱和密码正确
    userModel.getByEmail(req.body.email,(err,user) => {
      if(err) {
        return res.send('内部错了')
      }
      // //判断user是否存在
      if(!user) {
        //不存在
        return res.json({
          code:401,
          msg:"邮箱不存在"
        })
      }
      //判断密码是否正确
      const password = md5(req.body.password);
      if(password ===user.password) {
        //记录dession保存的状态
        // delete user.password
        // req.session.user = user

        //是跳转 还是输出json？？
        res.json({
          code:200,
          msg:'登陆成功'
        })
      }else{
        res.json({
          code:402,
          msg:'密码错误'
        })
      }
    })
    
    
}

//展示注册页面
exports.showSignup = (req,res) =>{
    res.render('signup.html')
}
//处理注册逻辑
exports.handleSignup = (req,res) =>{
    // res.send('234')
  //验证邮箱是否重复
  userModel.getByEmail(req.body.email,(err,user) =>{
    if(err) {
      // console.log(err)
      return res.send('cuole')
    }
    if(user) {
      //邮箱已经存在
      return res.render('signup.html',{
        msg:'邮箱已经存在'
      })
    }
    //验证昵称
    userModel.getByNickname(req.body.nickname,(err,user) =>{
      if(err) {
        return res.send('错了')
      }
      if(user) {
        //昵称已经存在
        return res.render('signup.html',{
          msg:'昵称已经存在'
        })
      }
      //添加用户
      req.body.createdAt = new Date()
      req.body.password = md5(req.body.password)
      
      userModel.createUser(req.body,(err,isOk) =>{
        if(isOk) {
          res.redirect('./signin')
        }else{
          res.render('signup.html',{
            msg:'注册失败'
          })
        }
      })
    })
  })
}

exports.handleSignout = (req,res)=>{
    res.send('88')
}