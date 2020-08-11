//importing express module
const exp=require('express')

//importing nodemailer
const nodemailer=require('nodemailer')

//importing string similarity module
const similarity=require('string-similarity')

var ObjectId=require('mongodb').ObjectID

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

//importing cloudinary
const cloudinary=require('cloudinary')

//importing multer-storage-cloudinary
const storageCloudinary=require('multer-storage-cloudinary')

//importing multer
const multer=require('multer')
const { ObjectID } = require('mongodb')

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

var storage=storageCloudinary({
    cloudinary:cloudinary,
    folder:'foundPics',
    allowedFormats:['jpg','png'],
    filename: function(req,file,cb)
    {
        cb(undefined,file.fieldname+"-"+Date.now())
    }
})

var uploader=multer({storage:storage})




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
                    jwt.sign({username:usrObj.username,type:'user'},process.env.hashkey,{expiresIn:60*60},(err,webToken)=>{
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

//user uploaded found item
userapi.post('/uploadfounditem',verifyToken,uploader.single('images'),(req,res)=>{
    imageUrl=req.file.secure_url
    foundItemData=JSON.parse(req.body.data)
    foundItemData['img']=imageUrl
    foundItemsCollectionObj=req.app.locals.foundItemsCollection
    foundItemsCollectionObj.insertOne(foundItemData,(err,Obj)=>{
        if(err)
        {
            console.log('error while inserting the found item object',err)
        }
        else
        {
            res.send({message:'found Item uploaded Successfully'})
        }
    })
})


//user get uploaded items
userapi.post('/uploadeddetails',verifyToken,(req,res)=>{
    foundItemsCollectionObj=req.app.locals.foundItemsCollection
    foundItemsCollectionObj.find({uploadedBy:req.body.username}).toArray((err,uploadedItems)=>{
        if(err)
        {
            console.log('error while getting the data of uploaded items',err)
        }
        else
        {
            res.send({message:'data got successfully',uploadedItems:uploadedItems})
        }
    })
})

//getUploaded Item details
userapi.post('/uploadeditemdetails',verifyToken,(req,res)=>{
    foundItemsCollectionObj=req.app.locals.foundItemsCollection
    foundItemsCollectionObj.findOne({_id:ObjectId(req.body._id)},(err,ItemObj)=>{
        if(err)
        {
            console.log('error while getting the item details',err)
        }
        else
        {
            res.send({data:ItemObj})
        }
    })
})


//compare the details of the products
userapi.post('/compareitems',verifyToken,(req,res)=>{
    foundItemsCollectionObj=req.app.locals.foundItemsCollection
    foundItemsCollectionObj.find({$and:[{type:req.body.type},{claimed:false},{uploadedBy:{$not:{$eq:req.body.username}}}]}).toArray((err,items)=>{
        if(err)
        {
            console.log('error while getting the items',err)
        }
        else if(items.length==0)
        {
            res.send({message:'No such Items found',data:[]})
        }
        else
        {
            //filter using date and last seen of the object
            items=items.filter((x)=>{
                founddate=x.founddate.split('-')
                lostdate=req.body.lostdate.split('-')
                if(parseInt(lostdate[2])<parseInt(founddate[2]))
                {
                    return true
                }
                else if(parseInt(lostdate[2])==parseInt(founddate[2]))
                {
                    if(parseInt(lostdate[1])<parseInt(founddate[1]))
                    {
                        return true
                    }
                    else if(parseInt(lostdate[1])==parseInt(founddate[1]))
                    {
                        if(parseInt(lostdate[0])<parseInt(founddate[0]))
                        {
                            return true
                        }
                        else if(parseInt(lostdate[0])==parseInt(founddate[0]))
                        {
                            foundtime=x.foundtime.split(':')
                            losttime=req.body.lastseentime.split(':')
                            if(parseInt(parseInt(foundtime[0])>parseInt(losttime[0])))
                            {
                                return true
                            }
                            else if(parseInt(foundtime[0])==parseInt(losttime[0]))
                            {
                                if(parseInt(foundtime[1])>=parseInt(losttime[1]))
                                {
                                    return true
                                }
                                else
                                {
                                    return false
                                }
                            }
                            else
                            {
                                return false
                            }
                        }
                        else
                        {
                            return false
                        }
                    }
                    else
                    {
                        return false
                    }
                }
                else
                {
                    return false
                }
            })
            if(items.length==0)
            {
                res.send({message:'No such Items found',data:[]})
            }
            else
            {
                keys=Object.keys(items[0])
                removeKeys=["_id","founddate","foundtime","uploadedBy","claimed","img","claimstatus"]
                items=items.filter((data)=>{
                    for(key in data)
                    {
                        if(removeKeys.includes(key))
                        {
                            continue
                        }
                        else
                        {
                            x=similarity.compareTwoStrings(data[key],req.body[key])
                            if(x<0.4)
                            {
                                return false
                            }
                        }
                    }
                    return true
                })
                if(items.length==0)
                {
                    res.send({message:'No such Items found',data:items})
                }
                else
                {
                    res.send({message:'Items found',data:items})
                }
            }
        }
    })
})


//api for claiming the object
userapi.post('/claimItem',verifyToken,(req,res)=>{
    toBeExChangedCollectionObj=req.app.locals.toBeExChangedCollection
    otp=(Math.floor(100000 + Math.random() * 900000)).toString()
    bcrypt.hash(otp,7,(err,hashedOtp)=>{
        if(err)
        {
            console.log('error while hashing otp',err)
        }
        else
        {
            req.body['otp']=hashedOtp
            req.body._id=ObjectId(req.body._id)
            toBeExChangedCollectionObj.insertOne(req.body,(err,obj)=>{
                if(err)
                {
                    console.log('error while adding  the otp and details of exchannge in db',err)
                }
                else
                {
                    userCollectionObj=req.app.locals.usercollection
                    userCollectionObj.findOne({username:req.body.uploadedBy},(err,uploadedUser)=>{
                        if(err)
                        {
                            console.log('error while getting details of the user',err)
                        }
                        else
                        {
                            foundItemsCollectionObj=req.app.locals.foundItemsCollection
                            foundItemsCollectionObj.updateOne({_id:ObjectId(req.body._id)},{$set:{claimed:true,claimstatus:'Pending'}},(err,Obj)=>{
                                if(err)
                                {
                                    console.log('error while changing the status',err)
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
                                        subject:'Otp and Details OF person To exchange Item',
                                        html:'<p>Your otp is '+otp+'. And the Details of user are, Name: '+uploadedUser.name+', Mobile no: '+uploadedUser.phno+', Email: '+uploadedUser.username+'.</p>'
                                    }
                                    transporter.sendMail(mailoptions,(err,info)=>{
                                        if(err)
                                        {
                                            console.log('error while sending the email',err)
                                        }
                                        else
                                        {
                                            res.send({message:'opt sent has been send to your email Id'})                    
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


//for giving the item
userapi.post('/acceptexchange',verifyToken,(req,res)=>{
    toBeExChangedCollectionObj=req.app.locals.toBeExChangedCollection
    toBeExChangedCollectionObj.findOne({_id:ObjectId(req.body._id)},(err,Obj)=>{
        if(err)
        {
            console.log('error while finding the otp object',err)
        }
        else
        {
            bcrypt.compare(req.body.otp,Obj.otp,(err,result)=>{
                if(err)
                {
                    console.log('error while comparing the otp',err)
                }
                else if(result==false)
                {
                    res.send({message:'Please enter correct Otp'})
                }
                else
                {
                    foundItemsCollectionObj=req.app.locals.foundItemsCollection
                    foundItemsCollectionObj.findOne({_id:ObjectID(Obj._id)},(err,itemObj)=>{
                        if(err)
                        {
                            console.log('error while getting the itemdetails',err)
                        }
                        else
                        {
                            exchangedItemsCollectionObj=req.app.locals.exchangedItemsCollection
                    let exchangeItem={}
                    exchangeItem['claimedBy']=Obj.username
                    exchangeItem['uploadedBy']=Obj.uploadedBy
                    exchangeItem['exchangeditem']=Obj._id
                    exchangeItem['img']=itemObj.img
                    exchangeItem['type']=itemObj.type
                    x= new Date()
                    exchangeItem['exchangeDate']=x.getDate()+'-'+(x.getMonth()+1)+'-'+x.getFullYear()
                    exchangedItemsCollectionObj.insertOne(exchangeItem,(err,uploadedObj)=>{
                        if(err)
                        {
                            console.log('error while inserting into transactions',err)
                        }
                        else
                        {
                            toBeExChangedCollectionObj.deleteOne({_id:ObjectId(req.body._id)},(err,status)=>{
                                if(err)
                                {
                                    console.log('error while deleting the otp',err)
                                }
                                else
                                {
                                    foundItemsCollectionObj.updateOne({_id:ObjectId(req.body._id)},{$set:{claimstatus:'Claimed'}},(err,status)=>{
                                        if(err)
                                        {
                                            console.log('error while setting the claimed status',err)
                                        }
                                        else
                                        {
                                            res.send({message:'You can hand over the product'})
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
        }
    })
})

//for rejecting to give
userapi.post('/rejectexchange',verifyToken,(req,res)=>{
    toBeExChangedCollectionObj=req.app.locals.toBeExChangedCollection
    toBeExChangedCollectionObj.deleteOne({_id:ObjectId(req.body._id)},(err,status)=>{
        if(err)
        {
            console.log('error while deleting the otp record',err)
        }
        else
        {
            foundItemsCollectionObj=req.app.locals.foundItemsCollection
            foundItemsCollectionObj.updateOne({_id:ObjectId(req.body._id)},{$set:{claimed:false,claimstatus:'Not claimed'}},(err,status)=>{
                if(err)
                {
                    console.log('error while updating the status',err)
                }
                else
                {
                    res.send({message:'Claim request rejected successfully'})
                }
            })
        }
    })

})

//resending exchange password
userapi.post('/resendexchangepassword',verifyToken,(req,res)=>{
    otp=(Math.floor(100000 + Math.random() * 900000)).toString()
    bcrypt.hash(otp,7,(err,hashedOtp)=>{
        if(err)
        {
            console.log('error while hashing otp',err)
        }
        else
        {
            toBeExChangedCollectionObj.updateOne({_id:ObjectId(req.body._id)},{$set:{otp:hashedOtp}},(err,obj)=>{
                if(err)
                {
                    console.log('error while updating  the otp and details of exchannge in db',err)
                }
                else
                {
                    toBeExChangedCollectionObj.findOne({_id:ObjectId(req.body._id)},(err,Obj)=>{
                        if(err)
                        {
                            console.log('error while getting the username')
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
                                    to:Obj.username,
                                    subject:'Otp and Details OF person To exchange Item',
                                    html:'<p>Your new otp is '+otp+'.</p>'
                                }
                                transporter.sendMail(mailoptions,(err,info)=>{
                                    if(err)
                                    {
                                        console.log('error while sending the email',err)
                                    }
                                    else
                                    {
                                        res.send({message:'new opt sent to your email Id'})                    
                                    }
                                })
                        }
                    })
                    
                }
            })
                            
        }
    })               
})


//exporting user api route
module.exports=userapi