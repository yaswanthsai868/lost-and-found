//importing exress modeule
const exp=require('express')

//importing the middleware
const verifyToken=require('../middlewares/verifyToken')

//importing json web token
const jwt=require('jsonwebtoken')

//importing bcrypt
const bcrypt=require('bcrypt')

//creting route to admin api
adminapi=exp.Router()

//parsing the body of the req object
adminapi.use(exp.json())

//add admin account
adminapi.post('/addaccount',verifyToken,(req,res)=>{
    adminCollectionObj=req.app.locals.admincollection
    //checking username existance
    adminCollectionObj.findOne({username:req.body.username},(err,dbobj)=>{
        if(err)
        {
            console.log('error while checking username',err)
        }
        else if(dbobj!=null)
        {
            res.send({message:'username is already admin'})
        }
        else
        {
            //checking roll number existance
            adminCollectionObj.findOne({rollno:req.body.rollno},(err,obj)=>{
                if(err)
                {
                    console.log('error while checking the roll no',err)
                }
                else if(obj!=null)
                {
                    res.send({message:'Roll number already registered'})
                }
                else
                {
                    //checking phone number existance
                    adminCollectionObj.findOne({phno:req.body.phno},(err,lobj)=>{
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
                                    adminCollectionObj.insertOne(req.body,(err,insertedobj)=>{
                                        if(err)
                                        {
                                            console.log('error while insertion',err)
                                        }
                                        else
                                        {
                                            res.send({message:'Admin added successfully'})
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

//delete admin account
adminapi.post('/removeaccount',verifyToken,(req,res)=>{
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
adminapi.post('/deleteaccount',verifyToken,(req,res)=>{
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
                    jwt.sign({username:adminObj.username,type:'admin'},process.env.hashkey,{expiresIn:60*60},(err,webToken)=>{
                        if(err)
                        {
                            console.log('error in generating web token',err)
                        }
                        else
                        {
                            res.send({message:'admin login success',webtoken:webToken,username:req.body.username})
                        }
                    })
                }
            })
        }
    })
})

//to get admin details
adminapi.get('/name/:username',verifyToken,(req,res)=>{
    adminCollectionObj=req.app.locals.admincollection
    adminCollectionObj.findOne({username:req.params.username},(err,adminObj)=>{
        if(err)
        {
            console.log('error while getting admin name',err)
        }
        else
        {
            res.send({message:'details sent successfully',details:adminObj})
        }
    })
})


//modify admin details
adminapi.post('/modifydetails',verifyToken,(req,res)=>{
    adminCollectionObj=req.app.locals.admincollection
    adminCollectionObj.findOne({$and:[{username:{$not:{$eq:req.body.username}}},{$or:[{phno:req.body.phno},{rollno:req.body.rollno}]}]},(err,obj)=>{
        if(err)
        {
            console.log('Error while checking duplication of data',err)
        }
        else if(obj==null)
        {
            adminCollectionObj.updateOne({username:req.body.username},{$set:{name:req.body.name,phno:req.body.phno,rollno:req.body.rollno}},(err,adminObj)=>{
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


//exporting admin api route
module.exports=adminapi