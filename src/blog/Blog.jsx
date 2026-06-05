import { useEffect, useState } from 'react';
import './Blog.css'
import { getBlogSummaries, getBlogsByTag } from '../services/BlogPosts';
import Loading from '../utils/Loading';
import { NavLink } from 'react-router-dom';
import { RiPencilFill } from "react-icons/ri";
// import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import BlogBackBtn from './BlogBackBtn';
import { IoMdArrowRoundBack } from 'react-icons/io';

function Blog() {
  const navigate = useNavigate();

  const [blogSummaries, setBlogSummaries] = useState([])
  const [allBlogSummaries, setAllBlogSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [tagState, setTagState] = useState(false)
  const [searchedTag, setSearchedTag] = useState('')

  useEffect(() => {
    const fetchSummaries = async () => {
      const summaries = await getBlogSummaries();
      const sorted = [...summaries].sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogSummaries(sorted);
      setAllBlogSummaries(sorted);

      setLoading(false);
    }
    fetchSummaries();
  }, [])

  const handleTagClick = async (tag) => {
    setLoading(true)
    const tagged_blogs = await getBlogsByTag(tag);
    const sorted = [...tagged_blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    setBlogSummaries(sorted);
    setTagState(true);
    setSearchedTag(tag)
    setLoading(false);
  }
  
  const handleExitTagState = () => {
    setBlogSummaries(allBlogSummaries)
    setTagState(false)
    setSearchedTag('')
  }

  return (
    <>
      {tagState &&
        <div>
          <div className='tag-title'>Posts tagged "{searchedTag}"</div>
          <button className="blog-back-btn" onClick={handleExitTagState}>
            <IoMdArrowRoundBack />
          </button>
        </div>
      }
      <div className='blog-container'>
        {loading ? <Loading /> : blogSummaries.map((i) => (
          <div key={i.id} className='blog-summary'>
            {console.log(i)}
            <div className='title-date-container'>
              <div className='title' onClick={() => navigate(`/blog/${i.id}`)}>{i.title}</div>
              <div className='date'>{new Date(i.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
            <div className='author-summary'>{i.author}</div>
            <div className='tag-container'>
              {i.tags.map((j) => (
                <div className='tag' key={j} onClick={() => {handleTagClick(j)}}>{j}</div>
              ))}
            </div>
            <div className='description'>{i.description}</div>
            <div className='upvotes-comments-container'>
              {/* <div>{i.upvotes} <FaHeart /></div> */}
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
