import { useEffect, useState } from 'react';
import './Blog.css'
import { getBlogSummaries } from '../services/BlogPosts';
import Loading from '../utils/Loading';
import { NavLink } from 'react-router-dom';

function Blog() {
  const [blogSummaries, setBlogSummaries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummaries = async () => {
      const summaries = await getBlogSummaries()

      setBlogSummaries(summaries)
      setLoading(false)
    }
    fetchSummaries()
  }, [])

  return (
    <div className='blog-container'>
      <NavLink to='/blog/post' className='post-btn'>Post</NavLink>
      {loading ? <Loading /> : blogSummaries.map((i) => (
        <div key={i.id} className='blog-summary'>
          <div className='title'>{i.title}</div>
          <div>{i.author}</div>
          <div>
            {i.tags.map((j) => {
              <div>{j}</div>
            })}
          </div>
          <div>{i.description}</div>
        </div>
      ))}
    </div>
  )
}

export default Blog
