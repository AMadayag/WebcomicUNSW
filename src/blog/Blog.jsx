import { useEffect, useState } from 'react';
import './Blog.css'
import { getBlogSummaries, getBlogsByTag } from '../services/BlogPosts';
import Loading from '../utils/Loading';
import { NavLink } from 'react-router-dom';
import { RiPencilFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from 'react-icons/io';
import BlogSummaries from './BlogSummaries';

function Blog() {
  const [blogSummaries, setBlogSummaries] = useState([])
  const [allBlogSummaries, setAllBlogSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [tagState, setTagState] = useState(false)
  const [searchedTag, setSearchedTag] = useState('')

  useEffect(() => {
    const handleSummaries = (summaries) => {
      const sorted = [...summaries].sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogSummaries(sorted);
      setAllBlogSummaries(sorted);
      setLoading(false);
    };
  
    getBlogSummaries(handleSummaries).then(handleSummaries);
  }, []);  

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
          <button className="blog-back-btn" onClick={handleExitTagState}>
            <IoMdArrowRoundBack />
          </button>
          <div className='tag-title'>Posts tagged "{searchedTag}"</div>
        </div>
      }
      <div className='blog-container'>
        {loading
          ? <Loading />
          : <BlogSummaries blogSummaries={blogSummaries} handleTagClick={handleTagClick} />}
      </div>
      <NavLink to='/blog/post' className='post-btn'>
        <div><RiPencilFill /></div>
      </NavLink>
    </>
  )
}

export default Blog
