import React, { useContext, useEffect, useRef,useState } from 'react';
import blogContext from '../context/blog/blogcontext';
import './blogitem.css';

const BlogItem = () => {
  const blog_context = useContext(blogContext);
  const { deleteblog,togglelike,getlikes,likes, editblog,getblogbyid,getcomments,comments,featchallblogs, blog,addcomment } = blog_context;

  const modalRef = useRef(null); // ✅ Modal DOM ref
  const modalInstance = useRef(null); // ✅ Bootstrap Modal instance

  const [commentform, setcommentform] = useState(true);

  const [seecomment, setseecomment] = useState(true);

  const [seelikes, setseelikes] = useState(true);

  let bloginit={id:"",etitle:"",econtent:"",ecommentbody:""}
  
  const [Blog, setBlog] = useState(bloginit)

  const handleShow = (blo) => {
    setBlog({id:blo._id,etitle:blo.title,econtent:blo.content})
    modalRef.current.click();
    
  };

  const handleclick=(e)=>{
    e.preventDefault();
    editblog(Blog.id,Blog.etitle,Blog.econtent);
    modalInstance.current.click();
  }

  const onchange=(e)=>{
    e.preventDefault();
    setBlog({...Blog,[e.target.name]: e.target.value})
  }

  const startcomment=(id)=>{
    getblogbyid(id);
    setcommentform(false);
  }

  const getblog=(id)=>{
    getblogbyid(id);
  }

  const startseelike=()=>{
    setseelikes(false);
  }

  const startseecomment=()=>{
    setseecomment(false);
  }

  const commentadd=(id)=>{
    addcomment(id,Blog.ecommentbody);
    setBlog(prev => ({ ...prev, ecommentbody: "" }));
    setcommentform(true);
  }


  useEffect(() => {
    featchallblogs();
  }, [featchallblogs]);

  return (
    <div>
      <button type="button" ref={modalRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* ✅ ref attached directly to modal DOM element */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div className="row mb-3">
                  <label htmlFor="etitle" className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" minLength={3} required id="etitle" value={Blog.etitle} name="etitle" onChange={onchange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="econtent" className="col-sm-2 col-form-label">Content</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" minLength={10} required id="econtent" value={Blog.econtent} name="econtent" onChange={onchange} />
                  </div>
                </div>

                <button  type="submit" className="btn btn-primary" onClick={handleclick}>Add blog</button>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={modalInstance}>Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <h3>Your blog</h3>
      {!Array.isArray(blog) || blog.length === 0 ? (
        <p>No blogs to display</p>
      ) : (
        blog.map((b) => (
          <div key={b._id} className="card my-2 p-2" onClick={() => getblog(b._id)}>
            <div>
              <h5>{b.title}</h5>
            </div>
            <p>{b.content}</p>
            <div className='my-2'>
              <small className="mx-3">{Array.isArray(b.likes) ? b.likes.length : 0} likes</small>
              <small className="mx-1">{Array.isArray(b.comments) ? b.comments.length : 0} comments</small>
            </div>

            <div className='my-2'>
              <button className="mx-3" onClick={() => togglelike(b._id)} >add/remove like</button>
              
              {commentform && (
                <button className="mx-1" onClick={e => { e.preventDefault(); startcomment(b._id); }} >add comment</button>
              )}

              {!commentform && (
                <form>
                  <div className="row mb-3">
                    <label htmlFor="ecommentbody" className="col-sm-2 col-form-label">commentbody</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="ecommentbody" value={Blog.ecommentbody} name="ecommentbody" onChange={onchange} />
                    </div>
                  </div>


                  <button type="submit" className="btn btn-primary" onClick={e => { e.preventDefault(); commentadd(b._id); }}>Add comment</button>
                </form>
              )}

            </div>
            
            <div className='my-2'>
              <button className="mx-3" onClick={() => deleteblog(b._id)}>
                Delete
              </button>

              {/* ✅ This will now open the modal */}
              <button className="mx-1" onClick={() => handleShow(b)}>
                Edit
              </button>

              {seecomment && (
                <button className="mx-1" onClick={e => { e.preventDefault(); startseecomment(); getcomments(b._id); }}>See comment</button>
              )}

              {!seecomment && (
                comments.map((c) => (
                  <div key={c._id} className="card my-2 p-2">
                    <div>
                      <h5>{c.comment}</h5>
                      <small>{c.commentor.name}</small>
                    </div>
                  </div>

                ))
                
              )}



              {seelikes && (
                <button className="mx-1" onClick={e => { e.preventDefault(); startseelike(); getlikes(b._id); }}>See Likes</button>
              )}

              {!seelikes && (
                likes.map((l) => (
                  <div key={l._id} className="card my-2 p-2">
                    <div>
                      <h6>{l.name}</h6>
                      <small>{l.email}</small>
                    </div>
                  </div>

                ))
                
              )}
            </div>
          </div>
        ))
      )}




    </div>
  );
};

export default BlogItem;