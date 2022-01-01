import pkg from "mongoose";

const userschema = pkg.Schema({
    firstname :  {
        type: String,
        required : true,
        trim : true
    },
    lastname :  {
        type: String,
        required : true,
        trim : true
    },
    username : {
            type:String,
            required : true,
            unique : true  ,
            trim : true   ,
            index : true,
            lowercase : true
        
    },
    email : {
        type : String,
        required  : true ,
        trim  : true,
        unique : true,
    },
    
    password :  {
        type: String,
    },
    phone : {
        type : String
    }


         
})


const user = pkg.model('user',userschema)
export default user;