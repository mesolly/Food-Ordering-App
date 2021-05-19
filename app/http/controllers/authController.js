var{userSchema} = require('../../models/user')
var bcrypt = require('bcrypt')

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
            const { name , email , password} = req.body
            userSchema.exists({ email : email}, (err,result)=>{
                if(result){
                    req.flash('error','Email already Registered')
                    req.flash('name' ,name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })
            //hash password
            var hashedPassword = await bcrypt.hash(password,10)
            //Create User
            const user = new userSchema({
                name : name,
                email : email,
                password : hashedPassword
            })
            user.save().then((user)=>{
                return res.redirect('/')
            }).catch(err =>{
                req.flash('error','Something went Wrong')
                return res.redirect('/register')
            })
        }
    }
}

module.exports=authController