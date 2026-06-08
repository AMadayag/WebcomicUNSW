import { useEffect, useState } from "react";
import { addCommentToBlog, addReplyToComment, getBlogFromId } from "../services/BlogPosts";
import Loading from "../utils/Loading";
import { useParams } from 'react-router-dom';
import BlogBackBtn from "./BlogBackBtn";
import AddComment from "./AddComment";
import "./BlogFull.css"
import "./Blog.css"

function BlogFull() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setBlogState() {
      const blog = await getBlogFromId(id);
      setBlog(blog);
      setLoading(false);
    }
    setBlogState();
  }, [id]);

  const handleAddComment = async (name, text) => {
    await addCommentToBlog(name, text, id);
    setBlog(prev => ({
      ...prev,
      comments: [...prev.comments, { author: name, text }]
    }));
  };

  const handleAddReply = async (name, text, commentId) => {
    await addReplyToComment(name, text, id, commentId);
    setBlog(prev => ({
      ...prev,
      comments: prev.comments.map(c =>
        c._id === commentId
          ? { ...c, replies: [...(c.replies ?? []), { author: name, text }] }
          : c
      )
    }));
  };

  return (
    <>
      {loading || !blog ? <Loading /> :
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
              ? <AddComment
                  title="Add a comment"
                  onSubmit={handleAddComment}
                  onClose={() => setAddComment(false)}
                />
              : <button className="add-comment-btn" onClick={() => setAddComment(true)}>
                  Add a comment
                </button>
            }
            {blog.comments.map((j, index) => (
              <div className='comment-thread' key={index}>
                <div className='existing-comments'>
                  <strong>{j.author}</strong>
                  <p>{j.text}</p>
                  <button className="add-comment-btn" onClick={() => setReplyingTo(replyingTo === j._id ? null : j._id)}>
                    Reply
                  </button>
                </div>

                <div className='replies-container'>
                {j.replies?.map((reply, rIndex) => (
                  <div className='existing-comments' key={rIndex}>
                    <strong>{reply.author}</strong>
                    <p>{reply.text}</p>
                  </div>
                ))}
                  {replyingTo === j._id &&
                    <AddComment
                      title={`Replying to ${j.author}`}
                      onSubmit={(name, text) => handleAddReply(name, text, j._id)}
                      onClose={() => setReplyingTo(null)}
                    />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}
    </>
  );
}

export default BlogFull;
