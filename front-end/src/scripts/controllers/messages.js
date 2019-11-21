import messageView from '../views/messages.art'
import httpModel from '../models/http'
class Messages{
    constructor(){
        this.messagelist = []
        this.isLogin = false
        this.username = ''
        this.account = ''
        this.render()
    }
    async render(){
        let that = this

        //判断是否登录 获取用户 名
        await this.auth()


        //如果是登录装态 连接socket
        if (this.isLogin) {
            var socket = io.connect('localhost:80')
       
            $('.btn-send').on('click',function(){
                var content = $('.send-content').val()
                if(content){
                    that.messagelist.push({'houtai' : content})
                    socket.emit('houtai',content)
                    that.renderer()
                    $('.send-content').val('')
                }
            })
            
            socket.on('server',function(msg){
                that.messagelist.push({'maoyan': msg})
                that.renderer()
            })
        }
        else{
            let html = messageView({
                username : this.username,
                messagelist : this.messagelist
            })
            $('.message-content').html(html)
        }
        
    }
    //渲染消息列表
    renderer(){
        let html = messageView({
            username : this.username,
            messagelist : this.messagelist
        })
        $('.message-content ul').html(html)
    }

    //判断是否是登录状态
    async auth(){
        //初始化
        this.isLogin = false
        this.username = ''
        this.account = ''
        //然后再判断是否登录
        let result = await httpModel.get({
            url:'/api/users/isLogin'
        })
        if(result.ret){
            this.username = result.data.username
            this.account = result.data.account
            this.isLogin = true
        }
    }

}

export default new Messages()