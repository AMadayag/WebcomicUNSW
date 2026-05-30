import { useState } from 'react'
import './CreatePost.css'

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    tags: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    //    
  };

  return (
    <div className='create-post-container'>
      <div className='heading'>Create a Blog Post</div>
      <form className='post-form' onSubmit={(e) => e.preventDefault()}>
        <div className='field-container'>
          <div className='input-title'>Title</div>
          <input className="short-input" name="title" value={formData.title} onChange={handleChange}/>
        </div>
        <div className='field-container'>
          <div className='input-title'>Author</div>
          <input className="short-input" name="author" value={formData.author} onChange={handleChange}/>
        </div>
        <div className='field-container'>
          <div className='input-title'>Description</div>
          <textarea className="long-input" name="description" value={formData.description} onChange={handleChange}/>
        </div>
        <div className='field-container'>
          <div className='input-title'>Tags (Separated by comma)</div>
          <textarea className="long-input" name="tags" value={formData.tags} onChange={handleChange}/>
        </div>
        <div className='field-container'>
          <div className='input-title'>Text</div>
          <textarea className="text-input" name="text" value={formData.text} onChange={handleChange}/>
        </div>
        <button className='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost
