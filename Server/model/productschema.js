import pkg from "mongoose"

const productschema = pkg.Schema({
    id: String,
    url: String,
    detailUrl : String,
    title:Object,
    price:Object,
    description: Object,
    discount : String,
    tagline : String

})

const products = pkg.model('product',productschema)
export default products