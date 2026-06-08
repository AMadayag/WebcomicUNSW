import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "./BlogFull.css"
import "./Blog.css"

function AddComment({ onSubmit, onClose, title = "Add a comment" }) {
  const [commentData, setCommentData] = useState({ name: '', comment: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, comment } = commentData;
    if (!name.trim() || !comment.trim()) return;
    await onSubmit(name, comment);
    setCommentData({ name: '', comment: '' });
    onClose();
  };

  return (
    <form className="add-comment-container" onSubmit={(e) => e.preventDefault()}>
      <div className="add-a-comment">{title}</div>
      <button className="add-comment-close-btn" onClick={onClose}>
        <IoCloseSharp />
      </button>
      <div className="comment-author-container">
        <div>Name:</div>
        <input name="name" value={commentData.name} onChange={handleChange} />
      </div>
      <div className="comment-text-container">
        <div>Comment:</div>
        <textarea name="comment" className="comment-text" value={commentData.comment} onChange={handleChange} />
      </div>
      <button className="submit-comment" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default AddComment;
