import './App.css'
import NavBar from './navBar/NavBar'
import WCHome from './WCHome/WCHome.jsx';
import Gallery from './gallery/Gallery'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<WCHome />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  )
}

export default App
