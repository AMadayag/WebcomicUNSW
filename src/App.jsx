import './App.css'
import NavBar from './navBar/NavBar'
import HomePage from './homePage/homePage'
import Gallery from './gallery/Gallery'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/WebcomicUNSW" element={<HomePage />} />
        <Route path="/WebcomicUNSW/gallery" element={<Gallery />} />
      </Routes>
    </>
  )
}

export default App
