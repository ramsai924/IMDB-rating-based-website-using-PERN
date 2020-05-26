const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const db = require("../config/database");
var session = require("express-session");
const admin = require("../models/admin");
const userdata = require("../models/user");

//sessions
router.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "keyboard cat",
    cookie: {
      maxAge: 7 * 24 * 3600 * 1000,
      sameSite: true,
      secure: false,
    },
  })
);

//get user data
router.get("/" , (req,res) => {
    userdata.findAll()
      .then((gig) => {
        res.json(gig);
      })
      .catch((err) => console.log(err));
})

//post user data
router.post("/", (req, res) => {
    
  userdata.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      ratings : [req.body.ratings],
      reviews : [req.body.reviews]
  }).then((data) => { 
    
      res.json("inserted") 
      
    })
    .catch((err) => console.log(err))
});

//login
router.post("/login" , (req,res) => {
    userdata.findAll()
      .then((data) => {
        
          data.map((dt) => {
              if (req.body.email === dt.email) {
                req.session.userid = data.id;
                  res.json("user authenticated")
              }
          })
       
      })
      .catch((err) => console.log(err));
})


//home page

//Getting data from two tables
router.get("/home", async (req, res) => {
  try {
    const admins = await admin.findAll()
    const user = await userdata.findByPk(10)

    res.json({ userdata: user, admins: admins })
  } catch (err) {
    console.error(err)
  }
})

//user click on particular movie div element
router.get("/home/:ids", (req, res) => {

  admin
    .findByPk(req.params.ids)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//pushing rating & reviews to movie data

router.put("/home/:ids", async (req, res) => {
  var star = req.body.mrating;
  var review = req.body.mreviews;
  try {
    var adminData = await admin.update(
      {
        mrating: sequelize.literal(
          `'${JSON.stringify(star)}'::jsonb || mrating`
        ),
        mreviews: sequelize.literal(
          `'${JSON.stringify(review)}'::jsonb || mreviews`
        ),
      },
      { where: { id: req.params.ids } }
    )

    var adminData = await userdata.update(
      {
        ratings: sequelize.literal(
          `'${JSON.stringify(star)}'::jsonb || ratings`
        ),
        reviews: sequelize.literal(
          `'${JSON.stringify(review)}'::jsonb || reviews`
        ),
      },
      { where: { id: req.params.ids } }
    )

    res.json("rating & review data inserted")
  } catch (err) {
    console.log(err)
  }
    
});


//get particular user
router.get("/:id" , (req,res) => {
     const ids = req.params.id;
     userdata
       .findByPk(ids)
       .then((data) => {
         return res.status(200).json(data);
       })
       .catch((err) => {
         console.log(err);
       });
})

//Update particular user
router.put("/:id" , (req,res) => {
      userdata
        .update(
          {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            ratings: [req.body.ratings],
            reviews: [req.body.reviews],
          },
          {
            where: { id: req.params.id },
          }
        )
        .then(() => {
          res.json("sucess update");
        })
        .catch((err) => {
          console.log(err);
        });
})

module.exports = router;