const { Movies } = require('../utils/db')

const save = (data)=>{
    let movie = new Movies(data)
    return movie.save()
}

const findAll = async ({start, count})=>{
    let list = await Movies.find({}).sort({_id:-1}).limit(~~count).skip(~~start)//后添加的数据排在前面
    let total = await Movies.find({}).count()
    return {
        list,
        total
    }
}

const findOne = async(id)=>{
    return await Movies.findById(id)
}

const update = async (data)=>{
    return await Movies.findByIdAndUpdate(data.id,data)
}

const remove = async (id)=>{
    return await Movies.findByIdAndDelete(id)
}

const search = async(keywords)=>{
    let reg = new RegExp(keywords,'gi')
    return await Movies.find({}).or([{movieName:reg},{movieStar:reg},{movieScore:reg},{movieType:reg},{movieTime:reg}])
}

module.exports = {
    save,
    findAll,
    update,
    findOne,
    remove,
    search
}