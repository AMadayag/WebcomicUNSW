import Blog from './blog/Blog.jsx';
import BlogFull from './blog/BlogFull.jsx';
import CreatePost from './blog/CreatePost.jsx';
import GalleryPage from './gallery/GalleryPage.jsx';
import NavBar from './navBar/NavBar'
import WCHome from './WCHome/WCHome.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<WCHome />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/post" element={<CreatePost />} />
        <Route path="/blog/:id" element={<BlogFull />} />
      </Routes>
    </>
  )
}

export default App
