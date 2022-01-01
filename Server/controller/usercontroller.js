import users from "../model/userSchema"

export const userloginin = async(req,res)=>{
    try{
            let user  = await users.findOne({username : req.body.username ,password : req.body.password})
            if(user){
                return res.status(200).json('username is valid')

            }
            
             return res.status(401).json('Invalid Credentials')
                
            
    }catch(error) {
        console.log(error)
    }
}
export const usersignup = async(req,res)=>{
    
    try{
        //    const exits = await users.findOne({username : request.body.username})
        //    if(exits){
        //        return res.status(401).json('user already exist')
        //    }
            const exits = await users.findOne({username : req.body.username });
            if(exits){
                return res.status(401).json('user is already registered')
            }
           
            const user = req.body
            const newuser = new users(user)
             await newuser.save()
             return res.status(200).json('user is registered succesfully!')
           
          
    }catch(error){
     console.log(error)    
    }



}



