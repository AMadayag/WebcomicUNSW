import { useEffect, useState } from "react";
import { getBlogFromId } from "../services/BlogPosts";
import Loading from "../utils/Loading";
import { useParams, useNavigate } from 'react-router-dom';

function BlogFull() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function setBlogState() {
      const blog = await getBlogFromId(id);
    
      setBlog(blog);
      console.log(blog)
      setLoading(false)
    }
    setBlogState();
  }, []);

  return (
    <>
      {loading ? <Loading /> :
      <div>
        <button onClick={() => navigate('/blog')}>Back</button>
        <div className="title">{blog.title}</div>
        <div className="author">{blog.author}</div>
        <div className="description">{blog.description}</div>
        <div className="text">{blog.text}</div>
      </div>}
    </>
    
  );
}

export default BlogFull