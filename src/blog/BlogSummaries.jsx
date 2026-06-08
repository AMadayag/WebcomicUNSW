import { FaCommentAlt } from "react-icons/fa"
import './Blog.css'
import { useNavigate } from "react-router-dom";

function BlogSummaries({ blogSummaries, handleTagClick }) {
  const navigate = useNavigate();

  return (
    blogSummaries.map((i) => (
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
    ))
  )
}

export default BlogSummaries
