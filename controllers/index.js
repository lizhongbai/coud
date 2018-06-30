
const topicModel =require('../model/topic')

const moment = require('moment')

exports.showIndex = (req,res) =>{
    // res.send('index.html')
    topicModel.getAll((err,topics)=>{
        //获取所有的话题数据
        if( err) {
            return res.send('错了')
        }
        res.render('index.html',{

            user:req.session.user,

            topics,

            moment
            
        })
    })
}