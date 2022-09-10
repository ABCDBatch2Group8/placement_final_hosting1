const express = require ('express');
const router = express.Router();
const Placement = require('../models/placement');
const jwt = require('jsonwebtoken')


function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  console.log("payload is",payload)
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

// Placement update by the employer
router.post('/add',verifyToken, (req,res)=>{
console.log("req.body offer",req.body);
    const placement = new Placement({
      job_id: req.body.offer.job_id,
      dwms_id: req.body.offer.dwms_id,
      email: req.body.offer.email,
      batch:req.body.offer.batch,
      name:req.body.offer.name,
      company: req.body.offer.company,
      designation: req.body.offer.designation,
      offer_date: req.body.offer.offer_date,
      ctc_per_annum: req.body.offer.ctc_per_annum
    })
    placement.save()
    .then(data => {
        res.json({"message":"Successfully registered", "status":"success"});
        console.log("success")
    })
    .catch(err => {
        res.json({"message":err,"status":"error"});
        console.log("error",err)
    })   
  });
  module.exports = router;
