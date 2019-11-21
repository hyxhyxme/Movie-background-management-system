const mongoose = require('Mongoose')
//端口后面是数据库的名字，若数据库中不存在则重新创建
mongoose.connect('mongodb://localhost:27017/hyx', {useUnifiedTopology:true,useNewUrlParser: true})
//users是集合，往集合中插入数据
const Users = mongoose.model('users',{
    movieLogo : String,
    account : String,
    username : String,
    password : String 
})

const Movies = mongoose.model('movies',{
    movieID : String,
    movieLogo : String,
    movieName : String,
    movieScore : String,
    movieStar : String, 
    movieType : String,
    movieLiving: String,
    movieTime : String,
    movieWant : String,
    movieInfo : String,
})

module.exports = {
    Users,
    Movies
}