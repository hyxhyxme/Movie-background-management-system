const store = require('store')

export default  {
    get({url,type = 'GET',data={}}){
        let token = store.get('token')
        return $.ajax({
            url,
            data,
            type,
            //localstore方式
           /*  headers:{
                'X-Access-Token':token
            }, */
            success:(result,textStatus,jqXHR)=>{
                //localstore方式
               /*  let token = jqXHR.getResponseHeader('X-Access-Token')
                if(token){
                    store.set('token',token)
                } */

                //cookie方式自动携带
                return result
            }
        })
    },
    update({url,data={},type="POST"}){
        return $.ajax({
            url,
            data,
            type,
            success(result){
                return result
            }
        })
    }
}