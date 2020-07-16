//importing express module
const exp=require('express')
//importing route of userapi
const userapi=require('./apis/userapi')
//importing route of adminapi
const adminapi=require('./apis/adminapi')
//importing route of authapi
const authapi=require('./apis/authapi')
//importing path module
const path=require('path')


//importing mongodb module
const mongodb=require('mongodb').MongoClient

//importing dotenv module
const dotenv=require('dotenv')

//configuring .env file
dotenv.config()

//creating express object
app=exp()

//connecting angular to static app
app.use(exp.static(path.join(__dirname,'./dist/lost-and-found')))

//routing the requests to respective apis
app.use('/user',userapi)
app.use('/admin',adminapi)
app.use('/auth',authapi)

//port number to listen for
const port=process.env.port

//connecting to mongodb database

mongodb.connect(process.env.mongourl,{useUnifiedTopology:true,useNewUrlParser:true},(err,dbObj)=>{
    if(err)
    {
        console.log('error while connecting to db',err)
    }
    else
    {
        app.locals.usercollection=dbObj.db(process.env.mongodbname).collection(process.env.mongousercollection);
        app.locals.admincollection=dbObj.db(process.env.mongodbname).collection(process.env.mongoadmincollection);
        app.locals.resetpasswordcollection=dbObj.db(process.env.mongodbname).collection(process.env.mongoresetpassword)
        app.locals.foundItemsCollection=dbObj.db(process.env.mongodbname).collection(process.env.foundItems)
        app.locals.toBeExChangedCollection=dbObj.db(process.env.mongodbname).collection(process.env.tobeexchanged)
        app.locals.exchangedItemsCollection=dbObj.db(process.env.mongodbname).collection(process.env.exchangeditems)
        console.log('db connected')
        //listening to port 3000
        app.listen(port,()=>{
            console.log(`server listening on port ${port}`)
        })
    }
})
