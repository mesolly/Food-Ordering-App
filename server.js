require('dotenv').config()
const express = require('express') 
const ejs = require('ejs') 
const expressLayout = require('express-ejs-layouts')
const path = require('path') 
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const app = express() 
var MongoDbStore = require('connect-mongodb-session')(session);

const PORT=process.env.PORT || 3000 

const url = 'mongodb://localhost/spice' ;
mongoose.connect(url,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology : true,
    useFindAndModify : true});
const connection = mongoose.connection ;

connection.once('open',()=>{
    console.log('Database Connected...');
}).catch(err=>{
    console.log('Connection failed ....')
});

//session store

var mongostore = new MongoDbStore({
    uri: url,
    collection: 'sessions'
    });

//session config
    app.use(session({
        secret : process.env.COOKIE_SECRET,
        resave : false,
        store : mongostore,
        saveUninitialized : false,
        cookie : { maxAge : 1000 * 60 * 60 * 24} //24 hour
    }))
//
app.use(flash())
//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(expressLayout) 
app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')
app.use(express.static('public'))

require('./routes/web')(app)

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
});