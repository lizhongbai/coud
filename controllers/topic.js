const categoryModel = require('../model/category')
const topicModel = require('../model/topic');

// 1 显示添加话题的页面
exports.showCreate = (req, res) => {

    categoryModel.getAll((err, categories) => {
        res.render('topic/create.html', {
            categories,
            user: req.session.user
        });
    });
    
  };
  // 2 处理添加话题  -- 接口
  exports.handleCreate = (req, res) => {
      if(!req.session.user) {
          res.json({
              code:403,
              mag:'请登陆'
          })
      }
      //验证用户输入
      req.body.userId =req.session.user.id
      req.body.createdAt = new Date()
    topicModel.createTopic(req.body,(err,isOK)=>{
        if(err) {
            return res.json({
                code:500,
                msg:'cuole'
            })
        }
        if(isOK) {
            res.json({
                code:200,
                msg:'添加成功'
            })
        }else{
            res.json({
                code:400,
                msg:'添加失败'
            })
        }
    })
  };
   
  exports.showTopic = (req, res) => {

    //`通过动态查询id
    const topicId = req.params.topicID 
    //判断id 是不是一个数字
   if(isNaN(topicId)) {
       res.send('参数错误')
   }

   topicModel.getById(topicId,(err,topic) =>{
       if(err) {
           return res.send('服务器内部错了')
       }
       if(topic) {
           res.render('topic/show.html',{
               topic,
               user:req.session.user
           })
       }else{
           res.send('话题不存在')
       }
   })

  };
  exports.showEdit = (req, res) => {
    res.send('showEdit');
  };
  exports.handleEdit = (req, res) => {
    res.send('handleEdit');
  };
  exports.handleDelete = (req, res) => {
    res.send('handleDelete');
  };