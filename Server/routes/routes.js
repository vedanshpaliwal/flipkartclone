import express, { response } from "express";
import { usersignup, userloginin } from "../controller/usercontroller";
import products from "../model/productschema";
import { paytmParams } from "../index";
import PaytmChecksum from "../../Server/paytm/PaytmChecksum";
import formidable from 'formidable';
import https from 'https';
import {v4 as uuid} from 'uuid';


const MID="DIY12386817555501617"
const Merchant_key = "bKMfNxPPf_QdZppa"
const WEBSITE =  "DIYtestingweb"
const Channel_id="WEB"
const Industry_type_id ="Retail"
const customer_id = "iPonEF85832472192671"
const ORDERID =  uuid()



const router = express.Router()


router.post('/signup', usersignup)
router.post('/login', userloginin)

router.get('/products', async (req, res) => {
    try {
        const product = await products.find()
        res.json(product)
    }catch(error){
        console.log('error at productcontroller',error)
    }
    
})
router.get('/product/:id',async(req,res)=>{
    try{
         const productItem = await products.findOne({'id' : req.params.id})
         res.json(productItem)
        }catch(error){
        console.log(error)
    }
})
router.post('/payment',async(req,res)=>{
  let paytmchecksum = await  PaytmChecksum.generateSignature(paytmParams,Merchant_key)
  try{
      let params = {
          ...paytmParams,'CHECKSUMHASH' : paytmchecksum
      }
      res.json(params)
  }
  catch(error){
      console.log("router wala error" ,error)
  }




})


router.post('/callback' ,(req,res)=>{

    const form = new formidable.IncomingForm();
    let paytmCheckSum = req.body.CHECKSUMHASH;
    delete req.body.CHECKSUMHASH;

    var isVerifySignature = PaytmChecksum.verifySignature(req.body, 'bKMfNxPPf_QdZppa', paytmCheckSum);
    console.log(isVerifySignature);
    if (isVerifySignature) {
        var paytmParams = {};
        paytmParams["MID"] = MID;
        paytmParams["ORDERID"] = ORDERID;

        PaytmChecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').then(function (checksum) {

            paytmParams["CHECKSUMHASH"] = checksum;

            var post_data = JSON.stringify(paytmParams);

            var options = {

                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            var response = "";
            var post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(response)
                    res.redirect(`http://localhost:3000/`)
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    } else {
        console.log("Checksum Mismatched");
    }
console.log('successfully done')




})

export default router