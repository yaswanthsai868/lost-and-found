//importing express module
const exp=require('express')

//importing jsonwebtoken
const jwt=require('jsonwebtoken')

//importing bcrypt
const bcrypt=require('bcrypt')

//importing nodemailer
const nodemailer=require('nodemailer')

//creating the route for auth api
authapi=exp.Router()

//parsing the req body
authapi.use(exp.json())

//importing verifyToken middleware
const verifyToken=require('../middlewares/verifyToken')

authapi.post('/forgotpassword',(req,res)=>{
    userCollection=req.app.locals.usercollection
    userCollection.findOne({username:req.body.username},(err,userObj)=>{
        if(err)
        {
            console.log('error while checking username for password reset',err)
        }
        else if(userObj==null)
        {
            res.send({message:'user not found'})
        }
        else
        {
            otp=(Math.floor(100000 + Math.random() * 900000)).toString()
            bcrypt.hash(otp,7,(err,hashedOtp)=>{
                if(err)
                {
                    console.log('error while hashing otp',err)
                }
                else
                {
                    resetCollection=req.app.locals.resetpasswordcollection
                    resetCollection.findOne({username:req.body.username},(err,otpObj)=>{
                        if(err)
                        {
                            console.log('Error while checking otp records',err)
                        }
                        else if(otpObj==null)
                        {
                            resetCollection.insertOne({createdAt:new Date(),username:req.body.username,otp:hashedOtp},(err,obj)=>{
                                if(err)
                                {
                                    console.log('error while storing the otp in db',err)
                                }
                                else
                                {
                                    transporter=nodemailer.createTransport({
                                        service:'gmail',
                                        auth:{
                                            user:process.env.gmailusername,
                                            pass:process.env.gmailpassword
                                        }
                                    })
                                    mailoptions={
                                        from:'electrnica.ekart@gmail.com',
                                        to:req.body.username,
                                        subject:'Otp for resetting your Lost and Found account password',
                                        html:'<p>Your otp is '+otp+'. It expires in 5 minutes</p>'
                                    }
                                    transporter.sendMail(mailoptions,(err,info)=>{
                                        if(err)
                                        {
                                            console.log('error while sending the email',err)
                                        }
                                        else
                                        {
                                            res.send({message:'opt sent',username:req.body.username})
                                        }
                                    })
                                }
                            })
                        }
                        else
                        {
                            resetCollection.updateOne({username:req.body.username},{$set:{otp:hashedOtp}},(err,updateStatus)=>{
                                if(err)
                                {
                                    console.log('error while updating the otp',err)
                                }
                                else
                                {
                                    transporter=nodemailer.createTransport({
                                        service:'gmail',
                                        auth:{
                                            user:process.env.gmailusername,
                                            pass:process.env.gmailpassword
                                        }
                                    })
                                    mailoptions={
                                        from:'electrnica.ekart@gmail.com',
                                        to:req.body.username,
                                        subject:'Otp for resetting your Lost and Found account password',
                                        html:'<p>Your otp is '+otp+'. It expires in 5 minutes</p>'
                                    }
                                    transporter.sendMail(mailoptions,(err,info)=>{
                                        if(err)
                                        {
                                            console.log('error while sending the email',err)
                                        }
                                        else
                                        {
                                            res.send({message:'opt sent',username:req.body.username})
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

//verifying otp
authapi.post('/verifyotp',(req,res)=>{
    otpCollection=req.app.locals.resetpasswordcollection
    otpCollection.findOne({username:req.body.username},(err,otpObj)=>{
        if(err)
        {
            console.log('error while checking the otp username',err)
        }
        else if(otpObj==null)
        {
            res.send({message:'Otp has been expired'})
        }
        else
        {
            bcrypt.compare(req.body.otp,otpObj.otp,(err,status)=>{
                if(err)
                {
                    console.log('error while comparing the passwords',err)
                }
                else if(status==false)
                {
                    res.send({message:'Incorrect Otp'})
                }
                else
                {
                    otpCollection.deleteMany({username:req.body.username},(err,obj)=>{
                        if(err)
                        {
                            console.log('error while deleting otp in database',err)
                        }
                        else
                        {
                            res.send({message:'Otp verified successfully'})
                        }
                    })
                }
            })
        }
    })
})

//reset password
authapi.post('/resetpassword',(req,res)=>{
    userCollectionObj=req.app.locals.usercollection
    bcrypt.hash(req.body.password,7,(err,hashedPassword)=>{
        if(err)
        {
            console.log('error while hashing the password',err)
        }
        else
        {
            userCollectionObj.updateOne({username:req.body.username},{$set:{password:hashedPassword}},(err,Obj)=>{
                if(err)
                {
                    console.log('error while updating the password',err)
                }
                else
                {
                    res.send({message:'password has been changed successfully'})
                }
            })
        }
    })
})

//change admin password
authapi.post('/changeadminpassword',verifyToken,(req,res)=>{
    adminCollectionObj=req.app.locals.admincollection
    adminCollectionObj.findOne({username:req.body.username},(err,adminObj)=>{
        if(err)
        {
            console.log('error while checking for the user',err)
        }
        else
        {
            bcrypt.compare(req.body.password,adminObj.password,(err,hashed)=>{
                if(err)
                {
                    console.log('error while matching the passwords',err)
                }
                else if(hashed==false)
                {
                    bcrypt.hash(req.body.password,7,(err,hashedPassword)=>{
                        if(err)
                        {
                            console.log('err while hashing the password')
                        }
                        else
                        {
                            adminCollectionObj.updateOne({username:req.body.username},{$set:{password:hashedPassword}},(err,status)=>{
                                if(err)
                                {
                                    console.log('error while changing the password')
                                }
                                else
                                {
                                    res.send({message:'Password change successfully'})
                                }
                            })
                        }
                    })
                }
                else
                {
                    res.send({message:'You cannot keep the new password as the current password'})
                }
            })
        }
    })
})


//change user password
authapi.post('/changeuserpassword',verifyToken,(req,res)=>{
    userCollectionObj=req.app.locals.usercollection
    userCollectionObj.findOne({username:req.body.username},(err,userObj)=>{
        if(err)
        {
            console.log('error while checking for the user',err)
        }
        else
        {
            bcrypt.compare(req.body.password,userObj.password,(err,hashed)=>{
                if(err)
                {
                    console.log('error while matching the passwords',err)
                }
                else if(hashed==false)
                {
                    bcrypt.hash(req.body.password,7,(err,hashedPassword)=>{
                        if(err)
                        {
                            console.log('err while hashing the password')
                        }
                        else
                        {
                            userCollectionObj.updateOne({username:req.body.username},{$set:{password:hashedPassword}},(err,status)=>{
                                if(err)
                                {
                                    console.log('error while changing the password')
                                }
                                else
                                {
                                    res.send({message:'Password change successfully'})
                                }
                            })
                        }
                    })
                }
                else
                {
                    res.send({message:'You cannot keep the new password as the current password'})
                }
            })
        }
    })
})

//exporting the route for authapi
module.exports=authapi