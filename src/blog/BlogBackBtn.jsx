import './Blog.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function BlogBackBtn() {
  const navigate = useNavigate();
  return (
    <button className="blog-back-btn" onClick={() => navigate('/blog')}>
      <IoMdArrowRoundBack />
    </button>
  )
}

export default BlogBackBtn
