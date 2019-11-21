var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movieRouter = require('./routes/movie')
var cookieSession = require('cookie-session')

const authMiddleware = require('./middlewares/auth')

var app = express();

//socket.io
var server = require('http').createServer(app)
var io = require('socket.io')(server)

server.listen(80)
io.on('connection',function(socket){
  socket.on('houtai',function(data){
    console.log(data);
    //socket.emit('server','hello too!')
    socket.broadcast.emit('server',data)
  })
  socket.on('maoyan',function(data){
    console.log(data);
    //socket.emit('server','hello too!')
    socket.broadcast.emit('server',data)
  })

  socket.on('disconnect',function(data){
    console.log('断开',data)
    socket.emit('server','离开')
  })
})



// view engine setup
app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    escape:false
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.use(cookieSession({
  name: 'session',
  secret : 'user is login',
  maxAge: 24 * 60 * 60 * 1000, //24 hours
 
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/movie',authMiddleware,movieRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
