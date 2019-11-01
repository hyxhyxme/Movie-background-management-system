const { Users } = require('../utils/db')

const save = (data)=>{
    const users = new Users(data)
    return users.save()
}
const findOne= (conditons)=>{
    return Users.findOne(conditons)
}
module.exports = {
    save,
    findOne
}