import './GalleryCloseup.css'
import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { gallery_images } from './GalleryImages';

function GalleryCloseup({ img_src, onClose }) {
  let [displayImage, updateDisplayImage] = useState(img_src);

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
  }, [onClose, displayImage]);

  const listGalleryImages = () => {
    const newArray = [];

    for (const image of gallery_images) {
      newArray.push('/WebcomicUNSW' + image[0]);
    }

    return newArray;
  }

  const imageLeft = () => {
    const galleryImages = listGalleryImages();
    let index = galleryImages.indexOf(displayImage);

    if (index - 1 < 0) {
      index = galleryImages.length - 1;
    } else {
      index = index - 1;
    }

    updateDisplayImage(galleryImages[index]);
  }

  const imageRight = () => {
    const galleryImages = listGalleryImages();
    let index = galleryImages.indexOf(displayImage);

    if (index + 1 > galleryImages.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }

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
