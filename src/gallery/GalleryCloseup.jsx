import './GalleryCloseup.css'
import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { getAllImages, getArtistLinkFromImage, getUsernameFromImage } from '../services/GalleryImages';

function GalleryCloseup({ img_src, onClose }) {
  const [galleryImages, setGalleryImages] = useState([]);
  let [displayImage, updateDisplayImage] = useState(img_src);
  let [byArtist, updateByArtist] = useState(null);

  useEffect(() => {
    getAllImages().then(imgs => {
      if (imgs) setGalleryImages(imgs);
    });
  }, []);

  useEffect(() => {
    updateByArtist(null);
    getUsernameFromImage(displayImage).then(name => updateByArtist(name));
  }, [displayImage]);

  useEffect(() => {
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
    return () => window.removeEventListener('keydown', handleKeyPress)
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

  const handleCheckOutTheArtist = async () => {
    window.open(await getArtistLinkFromImage(displayImage), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <button className='closeup-close-btn' onClick={onClose}>
        <IoCloseSharp />
      </button>

      <div className='closeup-container'>
        <button className='nav-btn nav-btn-left' onClick={imageLeft}>
          <FaAngleLeft />
        </button>

        <img src={displayImage} alt='img' className='closeup-img' />

        <button className='nav-btn nav-btn-right' onClick={imageRight}>
          <FaAngleRight />
        </button>
      </div>

      <div className='artist-text'>
        {byArtist &&
          <p className='artist-link' onClick={handleCheckOutTheArtist}>Made by {byArtist}</p>
        }
        <button className='artist-link' onClick={handleCheckOutTheArtist}>Check out the artist!</button>
      </div>
    </>
  )
}

export default GalleryCloseup
