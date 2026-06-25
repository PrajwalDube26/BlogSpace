import React ,{useContext} from 'react'
import blogContext from '../context/blog/blogcontext';

const About = () => {
  const context=useContext(blogContext);
  return (
    <div>
      this is about {context.name}
    </div>
  )
}

export default About
