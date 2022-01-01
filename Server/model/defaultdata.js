import { products } from "../../constants/products.js";
import productschema from "./productschema.js";
const defaultdata = async()=>{
try{
    await  productschema.insertMany(products)
    console.log('data imported successfully')
}
catch(error){
    console.log(message.error)
}

}
export default defaultdata;