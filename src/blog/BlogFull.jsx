import { useEffect, useState } from "react";
import { addCommentToBlog, getBlogFromId, getBlogsByTag } from "../services/BlogPosts";
import Loading from "../utils/Loading";
import { useParams } from 'react-router-dom';
import BlogBackBtn from "./BlogBackBtn";
import "./BlogFull.css"
import { IoCloseSharp } from "react-icons/io5";

function BlogFull() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null)
  const [addComment, setAddComment] = useState(false)
  const [loading, setLoading] = useState(true)
  const [commentData, setCommentData] = useState({
    name: '',
    comment: ''
  })

  useEffect(() => {
    async function setBlogState() {
      const blog = await getBlogFromId(id);
    
      setBlog(blog);
      console.log(blog)
      setLoading(false)
    }
    setBlogState();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async () => {
    setAddComment(false);
    const { name, comment } = commentData;
    await addCommentToBlog(name, comment, id);
    setBlog(prev => ({
      ...prev,
      comments: [...prev.comments, { author: name, text: comment }]
    }));
    setCommentData({ name: '', comment: '' });
  }

  return (
    <>
      {loading ? <Loading /> :
      <div>
        <BlogBackBtn />
        <div className="post-container">
          <div>
            <div className="title">{blog.title}</div>
            <div className="author">{blog.author}</div>
          </div>
          <div className="notes-container">
            <div>tags:</div>
            <div className='tag-container'>
              {blog.tags.map((i) => (
                <div className='tag' key={i}>{i}</div>
              ))}
            </div>
          </div>
          <div className="notes-container">
            <div>description:</div>
            <div className="description">{blog.description}</div>
          </div>
          <div className="text">{blog.text}</div>
          <div className="divider"></div>
          <div className="comments-container">
            {addComment
            ? <form className="add-comment-container" onSubmit={(e) => e.preventDefault()}>
                <div className="add-a-comment">Add a comment</div>
                <button className='add-comment-close-btn' onClick={() => {setAddComment(false)}}>
                  <IoCloseSharp />
                </button>
                <div className="comment-author-container">
                  <div>Name:</div>
                  <input name="name" value={commentData.name} onChange={handleChange}></input>
                </div>
                <div className="comment-text-container">
                  <div>Comment:</div>
                  <textarea name="comment" className="comment-text" value={commentData.comment} onChange={handleChange}></textarea>
                </div>
                <button className='submit-comment' onClick={handleSubmit}>Submit</button>
              </form>
            : <button className="add-comment-btn" onClick={() => {setAddComment(true)}}>Add a comment</button>
            }
            {blog.comments.map((j, index) => (
              <div className='existing-comments' key={index}>
                <strong>{j.author}</strong>
                <p>{j.text}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>}
    </>
    
  );
}

export default BlogFull
