import { useEffect, useState } from 'react';
import './Blog.css'
import { getBlogSummaries } from '../services/BlogPosts';
import Loading from '../utils/Loading';
import { NavLink } from 'react-router-dom';
import { RiPencilFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();

  const [blogSummaries, setBlogSummaries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummaries = async () => {
      const summaries = await getBlogSummaries();
      const sorted = [...summaries].sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogSummaries(sorted);

      setLoading(false)
    }
    fetchSummaries()
  }, [])

  return (
    <>
      <div className='blog-container'>
        {loading ? <Loading /> : blogSummaries.map((i) => (
          <div key={i.id} className='blog-summary' onClick={() => navigate(`/blog/${i.id}`)}>
            {console.log(i)}
            <div className='title-date-container'>
              <div className='title'>{i.title}</div>
              <div className='date'>{new Date(i.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
            <div className='author'>{i.author}</div>
            <div className='tag-container'>
              {i.tags.map((j) => (
                <div className='tag' key={j}>{j}</div>
              ))}
            </div>
            <div className='description'>{i.description}</div>
            <div className='upvotes-comments-container'>
              <div>{i.upvotes} <FaHeart /></div>
              <div>{i.comments} <FaCommentAlt /></div>
            </div>
          </div>
        ))}
      </div>
      <NavLink to='/blog/post' className='post-btn'>
        <div><RiPencilFill /></div>
      </NavLink>
    </>
  )
}

export default Blog
