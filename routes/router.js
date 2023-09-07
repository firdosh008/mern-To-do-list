const express = require("express");
const router = new express.Router();
// const Products = require("../models/productSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

//api calls ke lie ye route create kia he

// //get product data api
// router.get("/getproducts", async (req, res) => {
//   try {
//     const products = await Products.find({});
//     res.status(201).json(products);
//   } catch (error) {
//     console.log(error);
//   }
// });

// //get perticular data of a product

// router.get("/getproduct/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     //console.log(_id);

//     const individual_data = await Products.findOne({ id: _id });
//     //console.log(individual_data);

//     res.status(201).json(individual_data);
//   } catch (error) {
//     res.status(400).json(error);
//     console.log(error);
//   }
// });


//register user data
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  //console.log(req.body);
  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "Please fill the field properly" });
  }

  try {
    const preUser = await User.findOne({ email: email });
    if (preUser) {
      return res.status(422).json({ error: "Email already exist"});
    } else if (password != confirmPassword) {
      return res.status(422).json({ error: "Password not matching"});
    } else {
      const user = new User({ name, email, password, confirmPassword });
      const storeData = await user.save();
      res
        .status(201)
        .json({ message: "user registered successfully", data: storeData });
    }
  } catch (error) {
    console.log(error);
  }
});

//login user data
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);
  if (!email || !password) {
    return res.status(401).json({ error: "Please fill the field properly" });
  }

  try {
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      //  console.log(isMatch);
      if (isMatch) {
        //token generate
        const token = await userLogin.generateAuthToken();
        // console.log(token);

        //cookie generate
          res.cookie("todoWeb", token, {
          expires: new Date(Date.now() + 90000),
          httpOnly: true,
        });
        res
          .status(201)
          .json({ message: "user login successfully", data: userLogin });
      } else {
        res.status(402).json({ error: "Wrong Password" });
      }
    } else {
      res.status(403).json({ error: "No User found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Invalid details" });
  }
});

//get valid user
router.get("/validUser", authenticate, async (req, res) => {
  try {
    const validUser = await User.findOne({ _id: req.userID });
    // console.log(user);
    if (validUser) {
      res.status(201).json({ data: validUser });
    } else {
      res.status(401).json({ error: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//logout user
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((current) => {
      return current.token !== req.token;
    });
    res.clearCookie("todoWeb", { path: "/user/list" });
    await req.rootUser.save();
    res.status(201).json({ message: "user logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unknown error" });
  }
});



//adding data to List

router.post("/addToList/:id", authenticate, async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const List = await User.findOne({ id: _id });

    const user = await User.findOne({ _id: req.userID });
    //console.log(user);
    if (user) {
      const listData = await user.addToList(List);
      await user.save();
      res.status(201).json({ message: "product added to List", data: user });
    } else {
      res.status(401).json({ error: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unknown error" });
  }
});

// //geting List data
// router.get("/cartdetails", authenticate, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.userID });
//     //console.log(user);
//     if (user) {
//       res.status(201).json({ data: user });
//     } else {
//       res.status(401).json({ error: "user not found" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });



// //remove List data
// router.post("/remove/:id", authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;
//     req.rootUser.carts = req.rootUser.carts.filter((current) => {
//       return current.id !== id;
//     });
//     await req.rootUser.save();
//     res
//       .status(201)
//       .json({ message: "product removed from List", data: req.user });
//   } catch (error) {
//     console.log("error:" + error);
//     res.status(401).json({ error: "Unknow error" });
//   }
// });



module.exports = router;
