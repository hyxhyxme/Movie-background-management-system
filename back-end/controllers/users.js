const usersModel = require('../models/users')
const tools = require('../utils/tools')
const authMiddleware = require('../middlewares/auth')
const fs = require('fs')
const path = require('path')

const isLogin = authMiddleware

const register = async function(req, res, next) {
  res.set('Content-Type','application/json; charset=utf-8')
  let {account,username,password} = req.body
  
  let hash = await tools.hash(password)
  let result = await usersModel.save({
    account,
    username,
    password:hash
  })

  if(result){
    res.render('succ',{
      data:JSON.stringify({
        message:'用户注册成功'
      })
    })
  }else{
    res.render('fail',{
      data:JSON.stringify({
        message:'用户注册失败'
      })
    })
  }
    
}

const hasAccount = async function(req,res,next){
  res.set('Content-Type','application/json; charset=utf-8')
  let {account} = req.body
  let result = await usersModel.findOne({account})
  if(result){
    res.render('fail',{
      data:JSON.stringify({
        message:'该邮箱号已被注册'
      })
    })
  }else{
    next()
  }
  
}

const findOne = async function(req,res,next){
  res.set('Content-Type','application/json; charset=utf-8')
  let { account } = req.query
  
  let result = await usersModel.findOne({account})
 
  
  if(result){
    res.render('succ',{
      data:JSON.stringify({
        movieLogo : result.movieLogo,
        account : result.account,
        username : result.username,
        _id : result._id
      })
    })
  }
  else { 
    res.render('fail',{
      data:JSON.stringify({
        message : '该账号不存在'
      })
    })
  }
}

const update = async function( req, res, next){
  res.set('Content-Type','application/json; charset=utf-8')
  let data = req.query
  
  console.log(data);
  if(req.filename ===''){
    delete data.movieLogo
  }
  else{
    data.movieLogo = req.filename
   
    fs.unlink(path.resolve(__dirname,'../public/uploads/'+ data.tempLogo),(err)=>{
      if(err){
        console.log(err.message);
      }
    })
  }
  let result = await usersModel.update(data)
  if(result){
    res.render('succ',{
      data : JSON.stringify({
        message : '数据修改成功'
      })
    })
  }
  else{
    res.render('fail',{
      data :JSON.stringify({
        message : '数据修改失败'
      })
    })
  }
}

const login = async function(req,res,next){
  res.set('Content-Type','application/json; charset=utf-8')
  let {account, password} = req.body
  let result = await usersModel.findOne({account})
  if(result){
   let compareResult = await tools.compare(password,result.password)
   if(compareResult){
    
    let token = await tools.generateToken(account)
    //往header注入一个自定义字段，将token传给前端(localstore方案)
    //res.set('X-Access-Token',token)
    
    //cookie方案
    res.cookie('token',token)

    res.render('succ',{
      data:JSON.stringify({
        message:'登录成功',
        username:result.username,
        account : result.account,
        movieLogo : result.movieLogo
      })
    })
   }
   else{
    res.render('fail',{
      data:JSON.stringify({
        message:'账号或密码错误'
      })
    })
   }
  }else{
    res.render('fail',{
      data:JSON.stringify({
        message:'账号或密码错误'
      })
    })
  }
}


const exit = function(req,res,next){
  //req.session.account = null
  
  res.set('Content-Type','application/json; charset=utf-8')
  res.cookie("token",'')
  res.render('succ',{
    data:JSON.stringify({
      message:'退出成功',
    })
  })
}

module.exports = {
    register,
    hasAccount,
    login,
    isLogin,
    exit,
    findOne,
    update
}