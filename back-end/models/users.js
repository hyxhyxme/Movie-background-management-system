const { Users } = require('../utils/db')

const save = (data)=>{
    const users = new Users(data)
    return users.save()
}
const findOne= (conditons)=>{
    return Users.findOne(conditons)
}

const update = async (data)=>{
    return await Users.findByIdAndUpdate(data.id,data)
}
module.exports = {
    save,
    findOne,
    update
}