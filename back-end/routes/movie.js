var express = require('express')
var router = express.Router()
let movie = require('../controllers/movie')
let upload = require('../middlewares/upload')
/* router.get('/findAll',movie.findAll)
router.post('/save',movie.save)
router.patch('/save',) */

router.route('/')
    .get(movie.findAll)
    .post(upload,movie.save)
    .patch(upload,movie.update)
    .delete(movie.remove)
router.get('/findOne',movie.findOne)
router.post('/search',movie.search)
module.exports = router