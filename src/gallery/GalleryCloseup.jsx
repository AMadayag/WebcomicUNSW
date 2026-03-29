import './GalleryCloseup.css'
import React, { useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function GalleryCloseup({ img_src, onClose }) {
  useEffect(() => { // triggers onClose when esc key pressed
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <>
      <button className='button' onClick={onClose}><IoCloseSharp /></button>
      <div className='left-right-btns'>
        <button className='artist-link'><FaAngleLeft /></button>
        <button className='artist-link'><FaAngleRight /></button>
      </div>
      <div className='closeup-container'>
        <img
          src={img_src}
          alt='img'
        />
        <div className='artist-text'>
          <button className='artist-link'>Check Out the Artist!</button>
        </div>
      </div>
    </>
  )
}

export default GalleryCloseup
