import { useEffect, useState } from 'react';
import './Blog.css'
import { getBlogSummaries } from '../services/BlogPosts';
import Loading from '../utils/Loading';
import { NavLink } from 'react-router-dom';

function Blog() {
  const [blogSummaries, setBlogSummaries] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchSummaries = async () => {
  //     const summaries = await getBlogSummaries()

  //     setBlogSummaries(summaries)
  //     setLoading(false)
  //   }
  //   fetchSummaries()
  // }, [])

  return (
    <div className='blog-container'>
      <NavLink to='/blog/post' className='post-btn'>Post</NavLink>
      {/* {loading ? <Loading /> : blogSummaries.map((i) => (
        <div key={i} className='blog-summary'>
          {console.log(i)}
          <div className='title'>i</div>
        </div>
      ))} */}
    </div>
  )
}

export default Blog
