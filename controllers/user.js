


const db = require('./db.helper')

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
    db.query(
      'select * from `users` where `email`=?',
      req.body.email,
      (err,results) =>{
        if(err) {
          return req.send('内部出错')
        }
        //判断邮箱是否存在
        if(results.length <=0) {
          //
          return req.json({
            code:401,
            msg:"邮箱不存在"
          })
        }
        //判断密码对不对
          const password = md5(req.body.password);
          if (password !== results[0].password) {
            return res.json({
              code: 402,
              msg: '密码错误'
            });
          }
          // 如果用ajax请求的话，没办法使用res.redirect()
          // 成功
          res.json({
            code: 200,
            msg: '登录成功'
          })
      }
    )
    
    
}

//展示注册页面
exports.showSignup = (req,res) =>{
    res.render('signup.html')
}
//处理注册逻辑
exports.handleSignup = (req,res) =>{
    // res.send('234')
    db.query(
      'select * from `users` where `email`=?',
      req.body.email,
      (err,results) =>{
        
        if(err) {
          
          return res.send('内部错误')
        }

        if(results.length > 0) {
          //数据表已经存在数据
          res.render('signup.html',{
            msg:'邮箱已经存在'
          })
          return
        }
        
        //验证用户名
        db.query(
          'select * from `users` where `nickname`=?',
          req.body.nickname,
          (err,results) =>{
            
            if(err) {
              
              return res.send('内部错误')
            }

            if(results.length > 0 ) {
              
              //数据表已经存在
              res.render('signup.html',{
                msg:'昵称已经存在'
              })
              return
            }

            //  添加用户
            req.body.createdAt = new Date()
            req.body.password = md5(req.body.password)

            db.query(
              'insert into `users` set ?',
              req.body,
              (err,results) =>{
                
                if(err) {
                  // console.log(err)
                  return res.send('内部错了')
                }

                // console.log(results)
                if(results.affectedRows === 1) {
                  //成功
                  res.redirect('/signin');
                }else{
                  //失败
                  res.render('signup.html',{
                    msg:'注册失败'
                  })
                }
              }
            )
          }
        )
      }
    )   
}

exports.handleSignout = (req,res)=>{
    res.send('88')
}