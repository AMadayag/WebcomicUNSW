import './App.css'
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
      </Routes>
    </>
  )
}

export default App
