
const db = require('./db.helper')

const md5 = require('md5')

//注册逻辑

// 添加数据之前，要做数据验证
  // TODO  验证数据是否数据

  // 验证邮箱是否重复
  db.query(
    'select * from `users` where `email`=?',
    req.body.email,
    (err, results) => {
      if (err) {
        return res.send('服务器内部错误');
      }
      console.log(results);
      // 
      if (results.length > 0) {
        // 数据表中，已经存在该数据
        res.render('signup.html', {
          msg: '邮箱已存在'
        });
        return;
      }
      // 验证昵称是否重复
      db.query(
        'select * from `users` where `nickname`=?',
        req.body.nickname,
        (err, results) => {
          if (err) {
            return res.send('服务器内部错误');
          }
          if (results.length > 0) {
            // 昵称已经存在
            res.render('signup.html', {
              msg: '昵称已经存在'
            });
            return;
          }
          // 插入数据
          // 获取post数据 配置body-parser 在app.js中配置
          req.body.createdAt = new Date();
          // 对密码进行处理
          req.body.password = md5(req.body.password);
          // insert into `users`(nickname, pwd) values('zs', 18)
          // 插入数据库
          db.query(
            'insert into `users` set ?',
            req.body,
            (err, results) => {
              if (err) {
                console.log(err);
                return res.send('服务器内部错误');
              }
              
              // console.log(results);
              if (results.affectedRows === 1) {
                // 注册成功
                res.redirect('/signin');
                // res.send('<script>alert("注册成功");location.href="/signin";</script>');
              } else {
                res.render('signup.html', {
                  msg: '注册失败'
                });
              }
            }
          );
        }
      );
    }
  );