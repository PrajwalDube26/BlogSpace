import React, { useContext } from 'react';
import blogContext from '../context/blog/blogcontext';

const logout = () => {
    const blog_context = useContext(blogContext);
    const { logout } = blog_context;
    
    const onclicklogout=async()=>{
        await logout();

    }
    return (
        <div>
        <button onClick={onclicklogout}>confirm Logout</button>
        </div>
    )
}

export default logout
