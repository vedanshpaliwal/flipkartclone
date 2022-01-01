import {products} from './constants/products.js';
import productschemas from './model/productschema.js';

const defaultdata  = async()=>{
    try{
        await productschemas.deleteMany({})
        await productschemas.insertMany(products)
        console.log("inserted successfully")
    }
    catch(error){
        console.log(message.error)
    }
}

export default defaultdata