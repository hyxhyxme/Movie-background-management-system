import SMERouter from 'sme-router'
import { home } from '../controllers/home'
import { updateUser } from '../controllers/updateUser'
import * as movie from '../controllers/movie'

const router = new SMERouter('row')
//设置测导航栏的高亮
router.use((req)=>{
    let url = req.url.slice(1)
    let pre_url = url.split('/')[0].split('?')[0].split('_')[0]
    $(`a[data-url]`).removeClass('active')
    $(`a[data-url=${pre_url}]`).addClass('active')
})

router.route('/home',home)
router.route('/updateUser',updateUser)
router.route('/movie',movie.list)
router.route('/movie_add',movie.add)
router.route('/movie_update',movie.update)
router.route('/movie_list/:page',movie.list)

/* router.route('*',(req,res,next)=>{
    res.redirect('/home')
}) */