const mongodb=require('mongodb').MongoClient

require('dotenv').config()

mongodb.connect(process.env.mongourl,{useUnifiedTopology:true,useNewUrlParser:true},(err,dbo)=>{
    if(err)
    {
        console.log('error while conencting to mongodb')
    }
    else
    {
        resetpasswordcollection=dbo.db(process.env.mongodbname).collection(process.env.mongoresetpassword)
        resetpasswordcollection.createIndex({"createdAt":-1},{expireAfterSeconds:300},(err,obj)=>{
            if(err)
            {
                console.log('error while creating index',err)
            }
            else
            {
                console.log('index created successfully')
            }
        })
    }
})