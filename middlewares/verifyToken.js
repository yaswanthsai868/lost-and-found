const jwt=require('jsonwebtoken')


let verifyToken=(req,res,next)=>{
    let authorizationKey=req.headers['authorization']
    if(authorizationKey==undefined)
    {
        res.send({message:'please login'})
    }
    else
    {
        let extractedToken=authorizationKey.split(' ')[1]
        jwt.verify(extractedToken,process.env.hashkey,(err,decodedToken)=>{
            if(err)
            {
                res.send({message:'please relogin'})
            }
            else
            {
                next();
            }
        })
    }
}

module.exports=verifyToken;