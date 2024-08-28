const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const User = require('./models/User')
require('dotenv').config()

const app  = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173', 
}))
mongoose.connect(process.env.MONOG_URL)
const bcryptSalt = bcrypt.genSaltSync(8)
const jwtSecret = 'aldjfoadhfiahfoahjflaskjdfwerwtputocn'

//pouq7W499mVMBuI9


app.post('/register' , async (req, res) =>{
    const {name , email , password} = req.body;
    try{
        const userDoc = await User.create({
            name ,
            email , 
            password:bcrypt.hashSync(password , bcryptSalt) , 
        })
        res.json(userDoc)
    }catch(e){
        res.status(422).json(e)
    }
    
})
app.post('/login' ,async (req ,res)=>{
    const {email , password} = req.body 
    const userDoc= await User.findOne({email})
    if(userDoc) {
        const passOk = bcrypt.compareSync(password , userDoc.password)
        if(passOk){
            jwt.sign({email:userDoc.email , id:userDoc._id} , jwtSecret , {} ,(err , token)=>{
                if(err) throw err
                res.cookie('token' , token).json(userDoc)
            })
        }else{
            res.status(422).json('not found ')
        }
    }else{
        res.status(422).json('not found')
    }
})


app.get('/profile' ,  (req ,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token , jwtSecret , {} , async(err  , results)=>{
            if(err) throw err
            const userDoc = await User.findById(results.id)
            res.json(userDoc)
        })
    }else{
        res.json(null)
    }

})



app.listen(2000 , ()=>{
    console.log('the app is working on port 2000')
})