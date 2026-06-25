import React ,{useContext,useState} from 'react'
import blogContext from '../context/blog/blogcontext'


const Addblog = () => {
  const blog_context=useContext(blogContext);
  const {add_blog}=blog_context;

  let bloginit={title:"",content:"",}

  const [Blog, setBlog] = useState(bloginit)
  const handleclick=(e)=>{
    e.preventDefault();
    add_blog(Blog.title,Blog.content);
    setBlog({title:"",content:""})
  }

  const onchange=(e)=>{
    e.preventDefault();
    setBlog({...Blog,[e.target.name]: e.target.value})
  }

  return (

    <div className='my-3'>
        <h3>Add blog</h3>
        <form>
            <div className="row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">title</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" minLength={3} required id="title" name="title" value={Blog.title} onChange={onchange}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="content" className="col-sm-2 col-form-label">content</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" minLength={10} required id="content" name='content' value={Blog.content} onChange={onchange}/>
                </div>
            </div>
    
            
            <button disabled={Blog.title.length<3 ||Blog.content.length<10 } type="submit" className="btn btn-primary" onClick={handleclick}>Add blog</button>
        </form>
        
    </div>
    
  )
}

export default Addblog