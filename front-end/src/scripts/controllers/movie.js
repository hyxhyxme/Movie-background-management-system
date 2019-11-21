import movieView from '../views/movie.art'
import httpModel from '../models/http'
import movieAddView from '../views/movie-add.art'
import movieUpdateView from '../views/movie-update.art'
const _  =  require('lodash')

let count = 8
let currentPage = 1

function _handlePageNumberClick(req,res,obj,type,pageCount){
    if(type){
        let page = ~~req.params.page
        if(type === 'prev' && page > 1){
            res.go('/movie_list/'+(page-1))
        }
        else if(type === 'next' && page < pageCount.length){
            res.go('/movie_list/' + (page + 1))
        }
    }
    else{
        res.go('/movie_list/' + $(obj).text())
    }
}

function _handleAddClick(res){
    $('#btn-add').on('click',()=>{

        res.go('/movie_add')

    })
}

function _handleUpdateClick(req,res,obj){
    
    let id = $(obj).attr('data-id')
    let page = req.params.page || ''
    
    res.go('/movie_update',{id,page})
   
}

function _bind(req,res,next,pageCount){

    //增删改查

    _handleAddClick(res)

    $('.btn-update').on('click',function(){
        _handleUpdateClick(req,res,this)
    })
    $('.btn-delete').on('click',function(){
        _handleDeleteClick(req,res,this)
    })
    
    $('.form-search').on('keyup',(ev)=>{
        if(ev.keyCode === 13){
            _handleSearch(ev.target.value,res)
        }
    })

    //分页
    $('.page-next').on('click',function(){
        _handlePageNumberClick(req,res,this,'next',pageCount)
    })
    $('.page-prev').on('click',function(){
        _handlePageNumberClick(req,res,this,'prev')
    })
    $('.page-number').on('click',function(){
        _handlePageNumberClick(req,res,this)
    })
}

async function _handleDeleteClick(req,res,obj){
    let id = $(obj).attr('data-id')
    let tempMovieLogo = $(obj).attr('data-img')
    let result = await httpModel.update({
        url:'/api/movie',
        type:'delete',
        data:{
            id,
            tempMovieLogo
        }
    })
    if(result.ret){
        if(req.params.page){
            res.go('/movie_list/'+ req.params.page+'?r=' + new Date().getTime())
        }
        else{
            res.go('/movie?r=' + new Date().getTime())
        }
    }
    else{
        alert('删除失败')
    }
}
async function _handleSearch(keywords,res){
    let result = await httpModel.update({
        url:'/api/movie/search',
        type:'POST',
        data:{
            keywords:keywords
        }
    })
    if(result.ret){
        res.render(movieView({
            list:result.data.list
        }))
        _bind(res)
    }
}
export const list = async (req,res,next)=>{
    
    currentPage = req.params.page || 1
    let result = await httpModel.get({
        url:'/api/movie/',
        data:{
            start : (currentPage - 1) * count,
            count
        }
    })

    if(result.ret){
         //判断result.data.list是否为空数组，即是否有值
    
        if(result.data.list.list.length === 0){
            if(currentPage > 1){
                currentPage--
            }
            else{

            }
            result = await httpModel.get({
                url:'/api/movie/',
                data:{
                    start : (currentPage - 1) * count,
                    count
                }
            })
        }

        let pageCount = _.range(1,Math.ceil(result.data.list.total/count) + 1)
        let {list} = result.data.list   
        res.render(movieView({
            list,
            pageCount,
            currentPage,
            pageTotal : pageCount.length
        }))

        _bind(req,res,next,pageCount)
    }
    else{
        res.go('/home')
    }
    
    

  
}

export const add = async (req,res,next)=>{
    res.render(movieAddView())

   /*  $('#movie-add-submit').on('click',async ()=>{
        let data = $('#movie-form').serialize()
        let result = await httpModel.update({
            url:'/api/movie',
            data
        })
        if(result.ret){
            $('#movie-form')[0].reset()
            res.go('/movie')
        }
        else{
            alert(result.data.message)
        }
    }) */
    $('#movie-form').ajaxForm({
        resetForm:true,
        success:(result)=>{
            if(result.ret){
                res.go('/movie')
            }
            else{
                alert(result.data.message)
            }
        }
    })

    $('#movie-add-back').on('click',()=>{
        res.go('/movie')
    })

}

export const update = async(req, res, next)=>{
    let id = req.body.id
    let page = req.body.page
    let result = await httpModel.get({
        url:'/api/movie/findOne',
        data:{
            id
        }
    })
    
    res.render(movieUpdateView({
        item:result.data.item
    })) 

    $('#movie-form').ajaxForm({
        resetForm : true,
        dataType : 'json',
        url : '/api/movie',
        method :'patch',
        success:(result)=>{
            if(result.ret){
                res.go('/movie')
            }
            else{
                alert(result.data.message)
            }
        }
    })

    $('#movie-update-back').on('click',()=>{
        
        if(page){
            res.go('/movie_list/'+ page +'?r=' + new Date().getTime())
        }
        else{
            res.go('/movie')
        }
    })
}