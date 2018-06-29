

//展示登陆页面
//展示注册页面
//退出

exports.showSignin = (req,res) =>{
   res.render('signin.html')
}

//处理登陆界面
exports.handleSignin =(req,res) =>{
    send(123)
}

//展示注册页面
exports.showSignup = (req,res) =>{
    res.render('signup.html')
}
//处理注册逻辑
exports.handleSignup = (req,res) =>{
    res.send(234)
}

exports.handleSignout = (req,res)=>{
    res.send('88')
}