const express = require('express') 
const ejs = require('ejs') 
const expressLayout = require('express-ejs-layouts')
const path = require('path') 
const mongoose = require('mongoose')

const app = express() 

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

app.use(expressLayout) 
app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')
app.use(express.static('public'))

require('./routes/web')(app)

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
});