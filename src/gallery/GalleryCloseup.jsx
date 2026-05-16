import './GalleryCloseup.css'
import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { getAllImages } from '../mongodb/GalleryImages';

function GalleryCloseup({ img_src, onClose }) {
  const [galleryImages, setGalleryImages] = useState([]);
  let [displayImage, updateDisplayImage] = useState(img_src);

  useEffect(() => { // image fetch
    getAllImages().then(imgs => {
      if (imgs) setGalleryImages(imgs);
    });
  }, []);

  useEffect(() => { // triggers onClose when esc key pressed
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft') {
        imageLeft()
      } else if (event.key === 'ArrowRight') {
        imageRight()
      }
    };

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    };
  }, [onClose, displayImage, galleryImages])

  const imageLeft = () => {
    let index = galleryImages.indexOf(displayImage)
    index = index - 1 < 0 ? galleryImages.length - 1 : index - 1;
    updateDisplayImage(galleryImages[index]);
  }

  const imageRight = () => {
    let index = galleryImages.indexOf(displayImage);
    index = index + 1 > galleryImages.length - 1 ? 0 : index + 1;
    updateDisplayImage(galleryImages[index]);
  }

  return (
    <>
      <button className='button' onClick={onClose}><IoCloseSharp /></button>
      <div className='left-right-btns'>
        <button className='artist-link' onClick={imageLeft}><FaAngleLeft /></button>
        <button className='artist-link' onClick={imageRight}><FaAngleRight /></button>
      </div>
      <div className='closeup-container'>
        <img
          src={displayImage}
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
