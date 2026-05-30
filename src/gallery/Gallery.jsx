import { useEffect, useState } from 'react';
import './Gallery.css'
import Loading from '../utils/Loading';
import { gallery_images, getAllImages } from '../services/GalleryImages';

function Gallery({ onImageClick }) {
  const [galleryImgs, setGalleryImgs] = useState([])
  const [loading, setLoading] = useState(true)
  const [cols, setCols] = useState(() => window.innerWidth <= 768 ? 2 : 3)

  useEffect(() => {
    const handleResize = () => setCols(window.innerWidth <= 768 ? 2 : 3)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchImgs = async () => {
      const imgs = await getAllImages()
      const urls = imgs ?? gallery_images.map(([_, mod]) => mod.default)

      const imagesWithHeights = await Promise.all(
        urls.map(url => new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve({ url, height: img.naturalHeight / img.naturalWidth })
          img.onerror = () => resolve({ url, height: 1 })
          img.src = url
        }))
      )

      setGalleryImgs(imagesWithHeights)
      setLoading(false)
    }
    fetchImgs()
  }, [])

  const chunkArray = (arr, n) => {
    const columns = Array.from({ length: n }, () => []);
    const heights = new Array(n).fill(0);

    arr.forEach((item) => {
      const shortest = heights.indexOf(Math.min(...heights));
      columns[shortest].push(item);
      heights[shortest] += item.height;
    });

    return columns;
  };

  const rows = chunkArray(galleryImgs, cols)

  return (
    <div className='gallery-container'>
      <div className='vertical-row-text'>
        <a><h2>Gallery</h2></a>
        <a>Showing off all our wonderful artists and their <b>delicious</b> work.</a>
        <a>Everything you see here is made by society members!</a>
      </div>
      <div className='gallery-columns'>
        {loading ? <Loading /> : rows.map((row, rowIndex) => (
          <div key={rowIndex} className='vertical-row'>
            {row.map(({ url }) => (
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
    </div>
  )
}

export default Gallery
