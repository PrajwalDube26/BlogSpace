import React ,{useContext} from 'react'
import blogContext from '../context/blog/blogcontext';

const about = () => {
  const context=useContext(blogContext);
  return (
    <div>
      this is about {context.name}
    </div>
  )
}

export default about
