import './NavBar.css'
import { FaInstagram, FaDiscord } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function NavBar() {
  const insta_url = 'https://www.instagram.com/unswwebcomicsociety/'
  const discord_url = 'https://discord.gg/ctV4dcYcxu'

  function handleDiscordClick() {
    window.open(discord_url, '_blank', 'noopener,noreferrer');
  }

  function handleInstagramClick() {
    window.open(insta_url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className='nav-bar'>
      {/* buttons on navbar */}
      <NavLink to='/WebcomicUNSW' className='home-btn'>UNSW WEBCOMIC SOCIETY</NavLink>
      <div className='directory-container'>
        <NavLink to='/gallery' className='directory-btns'>Gallery</NavLink>
        <NavLink to='/blog' className='directory-btns'>Blog</NavLink>
        <NavLink to='/about-us' className='directory-btns'>About Us</NavLink>
      </div>
      <div className='social-container'>
        <button
          className='social-btns'><FaDiscord
          onClick={handleDiscordClick}
        /></button>
        <button
          className='social-btns'
          onClick={handleInstagramClick}
        ><FaInstagram /></button>
      </div>
    </div>
  )
}

export default NavBar
