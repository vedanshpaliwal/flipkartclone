// const express = require('express')
import express from 'express';
import dotenv from 'dotenv';
import connection from './database/db.js';
// import defaultdata from './model/defaultdata.js';
// import defaultdata from './model/defaultdata.js'
import datadefault from './datadefault.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes.js';
import {usersignup} from './controller/usercontroller.js';
import {v4 as uuid} from 'uuid';
const app = express()

app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use('/',router);



dotenv.config()
const PORT = process.env.PORT || 8000
const username = process.env.db_username;
const password = process.env.db_password
connection();





datadefault()
app.listen(PORT , ()=>{
    console.log(`Server is Running at port ${PORT}`)
})




const MID="DIY12386817555501617"
const Merchant_key = "bKMfNxPPf_QdZppa"
const WEBSITE =  "DIYtestingweb"
const Channel_id="WEB"
const Industry_type_id ="Retail"
const customer_id = "iPonEF85832472192671"


export let paytmMerchantKey = Merchant_key

export let paytmParams = {};
paytmParams['MID'] =  MID
paytmParams['WEBSITE'] =  WEBSITE
paytmParams['CHANNEL_ID'] =  Channel_id
paytmParams['INDUSTRY_TYPE_ID'] =  Industry_type_id
paytmParams['CUST_ID'] =  customer_id
paytmParams['ORDER_ID'] =  uuid()
paytmParams['TXN_AMOUNT'] =  '100'
paytmParams['CALLBACK_URL'] =  'http://localhost:8000/callback'
paytmParams['EMAIL'] =  'vedanshpaliwal4@gmail.com'
paytmParams['MOBILE_NO'] =  '46666464644'



