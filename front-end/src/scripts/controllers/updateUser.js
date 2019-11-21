import updateUserView from '../views/updateUser.art'

import httpModel from '../models/http'

export const updateUser = async(req, res, next)=>{
    let account = req.query.account
    let result = await httpModel.get({
        url : '/api/users/updateUser',
        data : {
            account
        }
    })
   let {username, movieLogo, _id} = result.data
 
    res.render(updateUserView({
        account,
        username,
        movieLogo,
        _id
    }))

    $('#user-form').ajaxForm({
        resetForm : true,
        dataType : 'json',
        url : '/api/users/update',
        method : 'patch',
        success :(result)=>{
            if(result.ret){
                res.go('/home')
            }
            else{
                alert(result.data.message)
            }
        }
    })

    $('#movie-update-user-back').on('click',()=>{
        res.go('/home')
        
    })
   
}