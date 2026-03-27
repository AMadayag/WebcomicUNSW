import './NavBar.css'
import { FaInstagram, FaDiscord } from "react-icons/fa";

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
    <div className='page-container'>
      <div className='nav-bar'>
        {/* buttons on navbar */}
        <button className='home-btn'>UNSW WEBCOMIC SOCIETY</button>
        <div className='directory-container'>
          <button className='directory-btns'>Gallery</button>
          <button className='directory-btns'>Blog</button>
          <button className='directory-btns'>About Us</button>
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
    </div>
  )
}

export default NavBar
