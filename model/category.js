//获取所有的分类
const db =require('./db.helper')

exports.getAll = (callback)=>{
    db.query(
        'select * from `topic_categories`',
        (err,results) =>{
            if(err) {
                return callback(err)
            }
            callback(null,results)
        }
    )
}