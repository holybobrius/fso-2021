import '../styles/blogs.css' 

import React, { useState } from 'react'
const Blog = ({blog}) => {
  const [expanded, setExpanded] = useState(false)
  return(
    <div className='blog'>
      {expanded 
        ? <div>
            <p>{`${blog.title} by ${blog.author}`}</p>
            <p style={{color: 'blue'}}>{blog.url}</p>
            <div>
              {`likes ${blog.likes}`}
              <button>like</button>
            </div>
            <p>{`added by ${blog.user.name}`}</p>
            <button onClick={() => setExpanded(!expanded)}>hide</button>
          </div> 
        : <div>
            {blog.title} {blog.author}
            <button onClick={() => setExpanded(!expanded)}>expand</button>
          </div>
      }
    </div> 
  )
}

export default Blog