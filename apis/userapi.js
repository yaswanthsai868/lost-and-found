//importing express module
const exp=require('express')

//importing jwt
const jwt=require('jsonwebtoken')

//importing bcrypt module
const bcrypt=require('bcrypt')

//creating route for userapi
userapi=exp.Router()

//for parsing the body of the request
userapi.use(exp.json())

//using dotenv
require('dotenv').config()

//middleware for the authorization
const verifyToken=require('../middlewares/verifyToken')


//user registration
userapi.post('/register',(req,res)=>{
    userCollectionObj=req.app.locals.usercollection
    //checking username existance
    userCollectionObj.findOne({username:req.body.username},(err,dbobj)=>{
        if(err)
        {
            console.log('error while checking username',err)
        }
        else if(dbobj!=null)
        {
            res.send({message:'username already exists'})
        }
        else
        {
            //checking roll number existance
            userCollectionObj.findOne({rollno:req.body.rollno},(err,obj)=>{
                if(err)
                {
                    console.log('error while checking the roll no',err)
                }
                else if(obj!=null)
                {
                    res.send({message:'Roll number already exists'})
                }
                else
                {
                    //checking phone number existance
                    userCollectionObj.findOne({phno:req.body.phno},(err,lobj)=>{
                        if(err)
                        {
                            console.log('error while checking the phno',err)
                        }
                        else if(lobj!=null)
                        {
                            res.send({message:'Phone number already registered'})
                        }
                        else
                        {
                            //hashing the passwaord
                            bcrypt.hash(req.body.password,7,(err,hashedPassword)=>{
                                if(err)
                                {
                                    console.log('error while hashing the password',err)
                                }
                                else
                                {
                                    req.body.password=hashedPassword
                                    //registering the user
                                    userCollectionObj.insertOne(req.body,(err,insertedobj)=>{
                                        if(err)
                                        {
                                            console.log('error while insertion',err)
                                        }
                                        else
                                        {
                                            res.send({message:'registration successful'})
                                        }
                                    })
                                }
                            })
                            
                        }
                    })
                }
            })
        }
    })
})

//userlogin
userapi.post('/login',(req,res)=>{
    userCollectionObj=req.app.locals.usercollection
    userCollectionObj.findOne({username:req.body.username},(err,usrObj)=>{
        if(err)
        {
            console.log('error while cheecking username',err)
        }
        else if(usrObj==null)
        {
            res.send({message:'Invalid credentials username'})
        }
        else
        {
            bcrypt.compare(req.body.password,usrObj.password,(err,result)=>{
                if(err)
                {
                    console.log('error while checking the password',err)
                }
                else if(result==false)
                {
                    res.send({message:'Invalid credentials password'})
                }
                else
                {
                    jwt.sign({username:usrObj.username,type:'user'},process.env.hashkey,{expiresIn:10*60},(err,webToken)=>{
                        if(err)
                        {
                            console.log('error in generating web token',err)
                        }
                        else
                        {
                            res.send({message:'user login success',webtoken:webToken,username:req.body.username})
                        }
                    })
                }
            })
        }
    })
})

//updating user details
userapi.post('/modifydetails',verifyToken,(req,res)=>{
    userCollectionObj=req.app.locals.usercollection
    userCollectionObj.findOne({$and:[{username:{$not:{$eq:req.body.username}}},{$or:[{phno:req.body.phno},{rollno:req.body.rollno}]}]},(err,obj)=>{
        if(err)
        {
            console.log('Error while checking duplication of data',err)
        }
        else if(obj==null)
        {
            userCollectionObj.updateOne({username:req.body.username},{$set:{name:req.body.name,phno:req.body.phno,rollno:req.body.rollno}},(err,userObj)=>{
                if(err)
                {
                    console.log('error while updating details',err)
                }
                else
                {
                    res.send({message:'Details updated successfully'})
                }
            })
        }
        else if(obj.phno==req.body.phno)
        {
            res.send({message:'Phone number already registered'})
        }
        else
        {
            res.send({message:'Roll number already registered'})
        }
    });
})
//to get userdetails
userapi.get('/name/:username',verifyToken,(req,res)=>{
    userCollectionObj=req.app.locals.usercollection
    userCollectionObj.findOne({username:req.params.username},(err,userObj)=>{
        if(err)
        {
            console.log('error while getting admin name',err)
        }
        else
        {
            res.send({message:'details sent successfully',details:userObj})
        }
    })
})




//exporting user api route
module.exports=userapi