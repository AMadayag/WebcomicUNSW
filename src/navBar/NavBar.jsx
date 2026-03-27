import './NavBar.css'
import { FaInstagram, FaDiscord } from "react-icons/fa";

function NavBar() {

  return (
    <div className='page-container'>
      <div className='nav-bar'>
        {/* buttons on navbar */}
        <button className='home-btn'>UNSW WEBCOMIC SOCIETY</button>
        <div className='directory-container'>
          <button className='directory-btns'>Gallery</button>
          <button className='directory-btns'>About Us</button>
        </div>
        <div className='social-container'>
          <button className='social-btns'><FaDiscord /></button>
          <button className='social-btns'><FaInstagram /></button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
