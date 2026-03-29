import './GalleryCloseup.css'
import { IoCloseSharp } from "react-icons/io5";

function GalleryCloseup({ img_src, onClose }) {
  return (
    <>
      <button className='button' onClick={onClose}><IoCloseSharp /></button>
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
