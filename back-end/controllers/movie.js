const movieModel = require('../models/movie')
const path = require('path')
const fs = require('fs')


const findAll = async (req,res,next)=>{
    res.set('Content-Type','application/json; charset=utf-8')
    let pageInfo = req.query
    let result = await movieModel.findAll(pageInfo)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
              list:result
            })
        })
    }
    else{
        res.render('fail',{
            data:JSON.stringify({
              list:[]
            })
        })
    }
}

const findOne = async (req,res,next)=>{
    let id = req.query.id
   
    let result = await movieModel.findOne(id)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
              item:result
            })
        })
    }
    else{
        res.render('fail',{
            data:JSON.stringify({
              item:[]
            })
        })
    }
}

const save = async (req,res,next)=>{
    res.set('Content-Type','application/json; charset=utf-8')
    let data = req.body
    data.movieLogo = req.filename
    let result = await movieModel.save(data)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
              message:'电影添加成功'
            })
        })
    }
    else{
        res.render('fail',{
            data: JSON.stringify({
                message : "数据添加失败"
            })
        })
    }
}


const update = async(req,res,next)=>{
    let data = req.query
    if(req.filename === ''){
        delete data.movieLogo
    }
    else{
        data.movieLogo = req.filename
        
        fs.unlink(path.resolve(__dirname,'../public/uploads/'+ data.tempMovieLogo),(err)=>{
            if(err){
                console.log(err.message);
            }
        })
    }
    
    let result = await movieModel.update(data)

    if(result){
        res.render('succ',{
            data: JSON.stringify({
                message : "数据修改成功"
            })
        })
    }
    else{
        res.render('fail',{
            data: JSON.stringify({
                message : "数据修改失败"
            })
        })
    }
}

const remove = async(req,res,next)=>{
    let { id, tempMovieLogo} = req.body
    let result = await movieModel.remove(id)

    if(result){
        fs.unlink(path.resolve(__dirname,'../public/uploads/'+ tempMovieLogo),(err)=>{
            if(err){
                console.log(err.message);
            }
        })
        res.render('succ',{
            data:JSON.stringify({
              message:'数据删除成功'
            })
        })
    }
    else{
        res.render('fail',{
            data:JSON.stringify({
                message:'数据删除失败'
            })
        })
    }

}


const search = async (req,res,next)=>{
    let {keywords} = req.body
    let result = await movieModel.search(keywords)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
              list:result
            })
        })
    }
    else{
        res.render('fail',{
            data:JSON.stringify({
              list:[]
            })
        })
    }
}

module.exports = {
    findAll,
    save,
    update,
    findOne,
    remove,
    search
}