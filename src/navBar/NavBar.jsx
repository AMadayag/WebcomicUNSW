import { useState } from 'react';
import './NavBar.css';
import { FaInstagram, FaDiscord } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const insta_url = 'https://www.instagram.com/unswwebcomicsociety/';
  const discord_url = 'https://discord.gg/ctV4dcYcxu';

  function handleDiscordClick() {
    window.open(discord_url, '_blank', 'noopener,noreferrer');
  }

  function handleInstagramClick() {
    window.open(insta_url, '_blank', 'noopener,noreferrer');
  }

  function close() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className='nav-bar'>
        <NavLink to='/' className='home-btn'>UNSW WEBCOMIC SOCIETY</NavLink>

        {/* Desktop links */}
        <div className='nav-links'>
          <div className='directory-container'>
            <NavLink to='/gallery' className='directory-btns'>Gallery</NavLink>
            <NavLink to='/blog' className='directory-btns'>Blog</NavLink>
            <NavLink to='/about-us' className='directory-btns'>About Us</NavLink>
          </div>
          <div className='social-container'>
            <button className='social-btns' onClick={handleDiscordClick}><FaDiscord /></button>
            <button className='social-btns' onClick={handleInstagramClick}><FaInstagram /></button>
          </div>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className='hamburger'
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label='Toggle menu'
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay backdrop */}
      {menuOpen && <div className='menu-backdrop' onClick={close} />}

      {/* Dropdown overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <NavLink to='/gallery' className='mobile-link' onClick={close}>Gallery</NavLink>
        <NavLink to='/blog' className='mobile-link' onClick={close}>Blog</NavLink>
        <NavLink to='/about-us' className='mobile-link' onClick={close}>About Us</NavLink>
        <div className='mobile-socials'>
          <button className='social-btns' onClick={() => { handleDiscordClick(); close(); }}><FaDiscord /></button>
          <button className='social-btns' onClick={() => { handleInstagramClick(); close(); }}><FaInstagram /></button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
