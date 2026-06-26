import React,{ useState } from 'react';
import BlogContext from './blogcontext';

const BlogState = (props) => {
  const bloginitial=[];
  const userinitial=[];

  const [blog, setblog] = useState(bloginitial)
  const [user_detail,setuser_detail]= useState(userinitial)
  const [comments, setcomments] = useState([]);
  const [likes, setlikes] = useState([]);



  const Signup = async (name, email, password) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    // formData.append("photo", photo); // <-- photo must be File object from <input type="file">

    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/auth2/SingUp`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    const json = await response.json();
    const token = json.authtoken;
    console.log(token);
    
  };



  const login=async(email,password)=>{
    //api call
    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/auth2/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email,password}),
      credentials: "include"

    });
    const json=await response.json();
    const token=json.authtoken;
    console.log(token)

  }


  const logout=async()=>{
    //api call
    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/auth2/logout`, {
      method: "POST",
      credentials: "include"

    });

    console.log("Logout successfully\n",response);

  }


  const featchuser = async() =>{

    //api call
    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/auth2/featchuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"

    });
    const json=await response.json();
    console.log(json);
    setuser_detail(json);

  }



  const featchblogs = async() =>{

    //api call
    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/featchownblog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const json = await response.json();
    if (Array.isArray(json)) {
      setblog(json);
    } else {
      setblog([]);
      console.error("Expected array but got:", json);
    }

  }



  const featchallblogs = async() =>{

    //api call
    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/featchAllblog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const json = await response.json();
    if (Array.isArray(json)) {
      setblog(json);
    } else {
      setblog([]);
      console.error("Expected array but got:", json);
    }

  }




  const add_blog = async (title, content) => {
    try {
      const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/addblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        // Try to read error as text
        const errText = await response.text();
        console.error("Server responded with error:", errText);
        return;
      }

      const json = await response.json();
      // If blog is an array, add the new blog; else, reset to array
      if (Array.isArray(blog)) {
        setblog(blog.concat(json));
      } else {
        setblog([json]);
        console.error("Blog state was not array, resetting with:", json);
      }

    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  };


  const togglelike=async(id)=>{

    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/togglelikes/${id}`, {
      method: "POST",
      credentials: "include"
    });

    const json = await response.json();
    setblog(json);

    console.log("toggling like with id" + id);

  }


  const getblogbyid=async(id)=>{

    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/getblogbyid/${id}`, {
      method: "GET",
      credentials: "include"
    });
    const blogdata = await response.json();
    setblog([blogdata]);

  }

  const addcomment=async(id,commentbody)=>{

    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/addcomments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ commentbody }),
    });

    const json = await response.json();
    setblog(json);
    console.log("adding comment to blog with id" + id);

  }


  const getcomments=async(blog_id)=>{
    const response0 = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/getblogbyid/${blog_id}`, {
      method: "GET",
      credentials: "include"
    });
    const blogdata = await response0.json();
    setblog([blogdata]);

    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/getcomments_by_blogid/${blog_id}`, {
      method: "GET",
      credentials: "include"
    });

    const json = await response.json();
    console.log("comments for blog with id" + blog_id, json);
    setcomments(json);
  }


  const getlikes=async(blog_id)=>{

    const response0 = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/getblogbyid/${blog_id}`, {
      method: "GET",
      credentials: "include"
    });
    const blogdata = await response0.json();
    setblog([blogdata]);


    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/getlikes_by_blogid/${blog_id}`, {
      method: "GET",
      credentials: "include"
    });

    const json = await response.json();
    console.log("likes for blog with id" + blog_id, json);
    setlikes(json);
  }


  const deleteblog=async( id )=>{

    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/delete_blog/${id}`, {
      method: "DELETE",
      credentials: "include"

    });
    //const json=await response.json();

    console.log("deleteing blog with id" + id)
    console.log(response);
    
    const blogs_after_delete=blog.filter((blogs)=>blogs._id !==id)
    setblog(blogs_after_delete)
  }


  const editblog=async( id ,title,content)=>{
    
    const response = await fetch(`https://blogspace-backend-shaz.onrender.com/api/blog_route/update_blog/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({title,content}),

    });

    console.log(response);
    

    let newblog=JSON.parse(JSON.stringify(blog))
    for(let i=0;i<blog.length;i++)
    {
      const element=blog[i];
      if(element._id===id)
      {
        newblog[i].title=title;
        newblog[i].content=content;
        break;
      }
    }
    setblog(newblog)
  }


  return (
    <BlogContext.Provider value={{blog,getblogbyid,add_blog,deleteblog,addcomment,getcomments,comments,togglelike,getlikes,likes,editblog,featchblogs,featchallblogs,setblog,Signup,login,logout,featchuser,user_detail}}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;