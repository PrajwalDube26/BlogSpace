const express = require('express');
const router = express.Router();
const { validationResult ,body } = require('express-validator');
const userSchema=require('../schema/user')
const bcrypt= require('bcryptjs');
var jwt = require('jsonwebtoken');
const getuser=require('../middleware/getuser')
const upload = require('../middleware/multer')

const jwt_secret=process.env.JWT_SECRET;

//Router 1:SingUp  :: login not required

router.post('/SingUp',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 })

],async(req,res)=>{
    console.log(req.body);
    
    const myValidationResult = validationResult(req);
    if (!myValidationResult.isEmpty()) {
        console.log("Validation Errors:", myValidationResult.array());

        return res.status(400).json({
            error: "Use correct credentials",
            errors: myValidationResult.array()
        });
    }


    try
    {
        let dublicate=await userSchema.findOne({email:req.body.email})
        if(dublicate)
        {
            return res.status(400).json({
                error: "This email is already taken"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const secpass=await bcrypt.hash(req.body.password, salt);

        const user_to_save=new userSchema({name:req.body.name,email:req.body.email,password:secpass});

        const savedUser=await user_to_save.save();

        const payload = {id: savedUser._id };

        const authtoken=await jwt.sign(payload,jwt_secret);


        res.cookie("authtoken", authtoken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        console.log("Cookies received:", req.cookies);

        res.send({"authtoken":authtoken});

    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(400).json({
            error: "internal server error occure"
        });
    }

})


//Router 2:login  :: login not required

router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 3 })

],async(req,res)=>{
    const myValidationResult = validationResult(req);
    if(!myValidationResult.isEmpty())
    {
        return res.status(400).send("use correct credential");
    }

    try
    {
        let dublicate=await userSchema.findOne({email:req.body.email})
        console.log(dublicate);
        if(!dublicate)
        {
            return res.status(400).send("User with this email not exits");
        }

        
        const correct=await bcrypt.compare(req.body.password,dublicate.password);
        if(!correct)
        {
            return res.status(400).send("please try using correct credential");
        }
        //const user=new userSchema({name:req.body.name,email:req.body.email,password:secpass});

        //const savedUser=await user.save();

        const payload = { id: dublicate._id  }; 

        const authtoken=await jwt.sign(payload,jwt_secret);


        res.cookie("authtoken", authtoken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        console.log("Cookies:", req.cookies);

        res.send({"authtoken":authtoken});

    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }

})


//Router 3:logout  :: login not required

router.post('/logout',async(req,res)=>{
    
    try
    {
        res.clearCookie("authtoken");
        return res.status(200).send("Logout successfully");
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }

})


//Router 4:featch logedin user detail  :: login required

router.post('/featchuser', getuser, async (req, res) => {
    console.log("Cookies received:", req.cookies); 
  try {
    const userid = req.user.id; // ✅ no await
    const user_to_featch = await userSchema.findById(userid).select("-password"); // optional: exclude password

    if (!user_to_featch)
    {
      return res.status(404).send("User not found");
    }

    res.send(user_to_featch);
  } 
  catch (error) 
  {
    console.error("Fetch user error:", error.message);
    return res.status(500).send("internal server error occurred");
  }
});



//Router 5:updateuser logedin user detail  :: login required

router.post('/updateuser', getuser,[
    body('newname').isLength({ min: 3 }),
    body('newemail').isEmail(),
    body('oldpassword').isLength({ min: 3 }),
    body('newpassword').isLength({ min: 3 })

], async (req, res) => {

    const myValidationResult = validationResult(req);
    if(!myValidationResult.isEmpty())
    {
        return res.status(400).send("use correct credential");
    }

    try {
        const userid = req.user.id; // ✅ no await
        const user_to_featch = await userSchema.findById(userid); // optional: exclude password

        const correct=await bcrypt.compare(req.body.oldpassword,user_to_featch.password);
        if(!correct)
        {
            return res.status(400).send("please try using correct credential");
        }
        const salt = bcrypt.genSaltSync(10);
        const secpass=await bcrypt.hash(req.body.newpassword, salt);

        let dublicate=await userSchema.findOne({email:req.body.newemail})
        if(dublicate && dublicate._id.toString() !== userid)
        {
            return res.status(400).send("this email is already taken");
        }

        user_to_featch.name=req.body.newname;
        user_to_featch.password=secpass;

        user_to_featch.email=req.body.newemail;

        await user_to_featch.save();

        res.send(user_to_featch);
    } 
    catch (error) 
    {
        console.error("Fetch user error:", error.message);
        return res.status(500).send("internal server error occurred");
    }
});


module.exports = router;
