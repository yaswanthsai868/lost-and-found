//importing exress modeule
const exp=require('express')

//importing json web token
const jwt=require('jsonwebtoken')

//importing bcrypt
const bcrypt=require('bcrypt')

//creting route to admin api
adminapi=exp.Router()

//parsing the body of the req object
adminapi.use(exp.json())

//add admin account
adminapi.post('/addaccount',(req,res)=>{
    adminCollectionObj=req.app.locals.admincollection
    adminCollectionObj.findOne({username:req.body.username},(err,adminObj)=>{
        if(err)
        {
            console.log('error while checking the admin username',err)
        }
        else if(adminObj!=null)
        {
            res.send({message:'username is already a admin'})
        }
        else
        {
            bcrypt.hash(req.body.password,7,(err,hashedPassword)=>{
                if(err)
                {
                    console.log('error while hashing admin password',err)
                }
                else
                {
                    req.body.password=hashedPassword
                    adminCollectionObj.insertOne(req.body,(err,Obj)=>{
                        if(err)
                        {
                            console.log('error in inserting the admin username')
                        }
                        else
                        {
                            res.send({message:'admin account added successfully'})
                        }
                    })
                }
            })
        }
    })
})

//delete admin account
adminapi.post('/removeaccount',(req,res)=>{
    adminCollectionObj=req.app.locals.admincollection
    adminCollectionObj.findOne({username:req.body.username},(err,adminObj)=>{
        if(err)
        {
            console.log('error while checking for the admin account')
        }
        else if(adminObj==null)
        {
            res.send({message:'Account is not an admin account'})
        }
        else
        {
            adminCollectionObj.deleteOne({username:req.body.username},(err,obj)=>{
                if(err)
                {
                    console.log('error in deleting the admin account',err)
                }
                else
                {
                    res.send({message:`admin account ${req.body.username} is deleted`})
                }
            })
        }
    })
})

//remove useraccount
adminapi.post('/deleteaccount',(req,res)=>{
    userCollectionObj=req.app.locals.usercollection
    userCollectionObj.findOne({username:req.body.username},(err,userObj)=>{
        if(err)
        {
            console.log('error in finding the username',err)
        }
        else if(userObj==null)
        {
            res.send({message:'username invalid'})
        }
        else
        {
            userCollectionObj.deleteOne({username:req.body.username},(err,obj)=>{
                if(err)
                {
                    console.log('error in deleting user account',err)
                }
                else
                {
                    res.send({message:`user account ${req.body.username} is deleted`})
                }
            })
        }
    })
})

//admin login
adminapi.post('/login',(req,res)=>{
    adminCollectionObj=req.app.locals.admincollection
    adminCollectionObj.findOne({username:req.body.username},(err,adminObj)=>{
        if(err)
        {
            console.log('error while cheecking username',err)
        }
        else if(adminObj==null)
        {
            res.send({message:'Invalid credentials username'})
        }
        else
        {
            bcrypt.compare(req.body.password,adminObj.password,(err,result)=>{
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
                    jwt.sign({username:adminObj.username,type:'admin'},process.env.hashkey,{expiresIn:10*60},(err,webToken)=>{
                        if(err)
                        {
                            console.log('error in generating web token',err)
                        }
                        else
                        {
                            res.send({message:'admin login success',webtoken:webToken})
                        }
                    })
                }
            })
        }
    })
})

//exporting admin api route
module.exports=adminapi