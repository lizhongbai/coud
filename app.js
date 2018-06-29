const express = require('express')


const app = express()

//引进router
const router = require('./routers/router')

app.listen(3000, ()=>{
    
    console.log('start')
})
//试水
// app.get('/',(req,res) =>{
//     res.send('halou')
// })
app.use(router)