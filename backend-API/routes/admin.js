const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const db = require('../config/database');
const admin = require('../models/admin');

//multer
var storage = multer.diskStorage({
    destination : './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var uploads = multer({ storage: storage }).single("mimage");


//GET DATA
router.get("/", (req, res) => {
    admin.findAll()
        .then((gig) => {
            // console.log(gig);
            // res.sendStatus(200);
            res.json(gig)
        })
        .catch((err) => console.log(err))
   
})

//ADD DATA
router.post("/",uploads, (req, res) => {

  admin.create({
    mname:req.body.mname,
    mcast:[req.body.mcast],
    mdesc:req.body.mdesc,
    mgeneres:req.body.mgeneres,
    mrating:[req.body.mrating],
    mreviews:[req.body.mreviews],
    mimage:req.file.filename
  })
    .then((gig) => {
      res.json("sucess");
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET EDIT FILE DATA
router.get("/:id" , (req,res) => {
    const ids = req.params.id;
   admin.findByPk(ids)
     .then((data) => {
       return res.status(200).json(data);
     })
     .catch((err) => {
       console.log(err);
     });
})

//UPDATE EDIT FILE DATA
router.put("/:id" ,uploads, (req,res) => {
    admin.update(
      {
        mname: req.body.mname,
        mcast: [req.body.mcast],
        mdesc: req.body.mdesc,
        mgeneres: req.body.mgeneres,
        mrating: [req.body.mrating],
        mreviews: [req.body.mreviews],
        mimage: req.file.filename,
      },
      {
        where: { id: req.params.id },
      }
    ).then(() => {
        res.json("sucess update")
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router;