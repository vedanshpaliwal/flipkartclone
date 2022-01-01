import products from "../model/productschema";

export const getProducts = async(req,res)=>{
    try{
            const Product = await products.find({});
            res.json(Product)
    }catch(error){
        console.log('error at product controller',error)
    }
}