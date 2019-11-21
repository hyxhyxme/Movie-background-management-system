const usersModel = require('../models/users')
const tools = require('../utils/tools')

const isLogin = async function(req,res,next){
    res.set('Content-Type','application/json; charset=utf-8')
    //localstore方式
    //let token = req.get('X-Access-Token')
    
    //cookie方式
    let token = req.cookies.token
    
    let decoded = await tools.verifyToken(token)
    if(decoded){
      if(req.path === '/isLogin'){
        let account = decoded.account
        let result = await usersModel.findOne({ account })
        res.render('succ',{
          data:JSON.stringify({
            message : '是登录状态',
            account : account,
            username : result.username,
            movieLogo: result.movieLogo
          })
        })
      }
      else{
        next()
      }
      
    }
    else{
        res.render('fail',{
          data:JSON.stringify({
            message:'不是登录状态,没有权限'
          })
        })
    }
    
    
}

module.exports = isLogin