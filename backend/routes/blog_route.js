const express = require('express');
const router = express.Router();
const blogsSchema=require('../schema/blog')
const { validationResult ,body } = require('express-validator');
const bcrypt= require('bcryptjs');
const getuser=require('../middleware/getuser');
var jwt = require('jsonwebtoken');



//Router 1:featchAllblog  :: login required

router.get('/featchAllblog', getuser, async (req, res) => {
  try {
    const userid = req.user.id; // FIXED: removed await
    const blogs = await blogsSchema.find({});

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found" });
    }

    res.json(blogs); // use json
  } catch (error) {
    console.error("Error in /featchAllblog:", error.message);
    return res.status(500).json("Internal Server Error");
  }
});



//Router 1:featchownblog  :: login required


router.get('/featchownblog', getuser, async (req, res) => {
  try {
    const userid = req.user.id; // FIXED: removed await
    const blogs = await blogsSchema.find({ user: userid });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found" });
    }

    res.json(blogs); // use json
  } catch (error) {
    console.error("Error in /featchownblog:", error.message);
    return res.status(500).json("Internal Server Error");
  }
});




//Router 2:featchownblog_by_title  :: login not required

router.get('/featchownblog_by_title',[
    body('title').isLength({ min: 3 })

],async(req,res)=>{
    try {

        const blogs_to_featch = await blogsSchema.find({title:req.body.title});
        if (!blogs_to_featch) 
        {
            return res.status(404).send("User with this title not found");
        }
        console.log(blogs_to_featch)
        res.send(blogs_to_featch)
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})


//Router 3:featchownblog_by_author  :: login not required

router.get('/featchownblog_by_author',[
    body('author').isLength({ min: 3 })

],async(req,res)=>{
    try {

        const blogs_to_featch = await blogsSchema.find({author:req.body.author});
        if (!blogs_to_featch) {
            return res.status(404).send("User with this user not found");
        }
        console.log(blogs_to_featch)
        res.send(blogs_to_featch)
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})



//Router 4:addblog  :: login required


router.post('/addblog', getuser, [
body('title').isLength({ min: 3 }),
body('content').isLength({ min: 10 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Proper JSON response
  }

  try {
    const { title, content } = req.body;
    console.log("req.user:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }


    const blog = new blogsSchema({
      user: req.user.id, // no await here
      title,
      content
    });

    const savedBlog = await blog.save(); // await it!
    console.log(savedBlog);
    res.json(savedBlog); // use res.json instead of res.send

  } 
  catch (error) 
  {
    console.error("Error in /addblog:", error.message);
    res.status(500).send("Internal Server Error");
  }
});



//Router 5:delete_blog  :: login required

router.delete('/delete_blog/:id',getuser,async(req,res)=>{
    try {
        const userid=req.user.id;
        const blog=await blogsSchema.findOne({ _id: req.params.id });
        
        if(userid === blog.user.toString())
        {
          await blogsSchema.findByIdAndDelete(req.params.id);
          return res.send("deleted succefully")
        }
        res.send("not deleted")

    }
    catch (error)
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})


//Router 6:update_blog  :: login required

router.post('/update_blog/:id',getuser,[
body('title').isLength({ min: 3 }),
body('content').isLength({ min: 10 })
],async(req,res)=>{
    try {
      const userid=req.user.id;
      const blog=await blogsSchema.findOne({ _id: req.params.id });
      if(blog.user.toString() === userid)
      {
        await blogsSchema.findByIdAndUpdate(req.params.id,{title:req.body.title,content:req.body.content});
        return res.send("updated succefully")
      }
      res.send("you are not authenticated for updation of blog")
    }
    catch (error)
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})


//Router 8:getlikes  :: login required

router.get('/getlikes/:id',getuser,async(req,res)=>{
    try {
      const {id}=req.params;
      const blog = await blogsSchema.findById(id);
      if (!blog) {
        return res.status(404).send("Blog not found");
      }
      const likes=blog.likes;

      res.json({likesCount: blog.likes.length,likes:likes});
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})


//Router 9:togglelikes  :: login required

router.post('/togglelikes/:id',getuser,async(req,res)=>{
    try {
      const {id}=req.params;
      const userid=req.user.id;

      const blog = await blogsSchema.findById(id);

      if (!blog)
      {
        return res.status(404).send("Blog not found");
      }

      const hasliked = blog.likes.some((uid) => uid.toString() === userid.toString());


      if(!hasliked)
      {
        blog.likes.push(userid);
      }
      else
      {
        blog.likes.pull(userid);
      }
      
      await blog.save();

      const blogs = await blogsSchema.find({});
      res.json(blogs);
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})



//Router 10:getcomments_by_blogid  :: login required

router.get('/getcomments_by_blogid/:blog_id',getuser,async(req,res)=>{
    try {
      const {blog_id}=req.params;
      const blog = await blogsSchema.findById(blog_id).populate({path: "comments.commentor",select: "name email"});
      
      if (!blog) {
        return res.status(404).send("Blog not found");
      }
      const comments=blog.comments;

      res.json(comments);
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})



//Router 11:getlikes_by_blogid  :: login required

router.get('/getlikes_by_blogid/:blog_id',getuser,async(req,res)=>{
    try {
      const {blog_id}=req.params;
      const blog = await blogsSchema.findById(blog_id).populate({path: "likes",select: "name email"});
      
      if (!blog) {
        return res.status(404).send("Blog not found");
      }
      const likes=blog.likes;

      res.json(likes);
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(500).send("internal server error occure");
    }
})



//Router 12:addcomments  :: login required

router.post('/addcomments/:id',getuser, async (req, res) => {
    try {
      const { id } = req.params;
      const userid = req.user.id;
      const mongoose = require('mongoose');
      const commentbody = req.body.commentbody;

      const blog = await blogsSchema.findById(id);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Ensure commentor is ObjectId
      const newcomment = {
        comment: commentbody,
        commentor: new mongoose.Types.ObjectId(userid)
      };

      blog.comments.push(newcomment);
      await blog.save();

      const blogs = await blogsSchema.find({});
      res.json(blogs);

    } 
    catch (error) {
      console.error("Error in /addcomments/:id", error);
      return res.status(500).json({ error: "Internal server error occurred"});
    }
});




module.exports = router;