import { useEffect, useState } from 'react';
import './Gallery.css'
import { gallery_images, getAllImages } from '../mongodb/GalleryImages';
import Loading from './Loading';

function Gallery({ onImageClick }) {
  const [galleryImgs, setGalleryImgs] = useState([])
  const [loading, setLoading] = useState(true)

  const chunkArray = (arr, n) =>
    Array.from({ length: n }, (_, i) => arr.filter((_, idx) => idx % n === i));

  useEffect(() => {
    const fetchImgs = async () => {
      const imgs = await getAllImages()
      if (!imgs) {
        setGalleryImgs(gallery_images.map(([_, mod]) => mod.default))
      } else {
        setGalleryImgs(imgs)
      }
      setLoading(false)
    }
    fetchImgs()
  }, [])

  const rows = chunkArray(galleryImgs, 3)

  return (
    <div className='gallery-container'>
      <div className='vertical-row-text'>
        <a><h2>Gallery</h2></a>
        <a>Showing off all our wonderful artists and their
          <b> delicious</b> work.</a>
        <a>Everything you see here is made by society members!</a>
      </div>
      {loading ? <Loading /> : rows.map((row, rowIndex) => (
        <div key={rowIndex} className='vertical-row'>
          {row.map((url) => (
            <img
              key={url}
              src={url}
              onClick={() => onImageClick(url)}
              alt='img'
              className='gallery-img'
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Gallery
