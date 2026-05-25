import { useEffect, useState } from 'react';
import './Gallery.css'
import { gallery_images, getAllImages } from '../mongodb/GalleryImages';
import Loading from './Loading';

function Gallery({ onImageClick }) {
  const [galleryImgs, setGalleryImgs] = useState([])
  const [loading, setLoading] = useState(true)

  // const chunkArray = (arr, n) =>
  //   Array.from({ length: n }, (_, i) => arr.filter((_, idx) => idx % n === i));

  // useEffect(() => {
  //   const fetchImgs = async () => {
  //     const imgs = await getAllImages()
  //     if (!imgs) {
  //       setGalleryImgs(gallery_images.map(([_, mod]) => mod.default))
  //     } else {
  //       setGalleryImgs(imgs)
  //     }
  //     setLoading(false)
  //   }
  //   fetchImgs()
  // }, [])
  useEffect(() => {
    const fetchImgs = async () => {
      const imgs = await getAllImages()
      const urls = imgs ?? gallery_images.map(([_, mod]) => mod.default)
  
      // Pre-load all images to get their natural heights
      const imagesWithHeights = await Promise.all(
        urls.map(url => new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve({ url, height: img.naturalHeight / img.naturalWidth })
          img.onerror = () => resolve({ url, height: 1 }) // fallback ratio
          img.src = url
        }))
      )
  
      setGalleryImgs(imagesWithHeights)
      setLoading(false)
    }
    fetchImgs()
  }, [])

  const chunkArray = (arr, n) => {
    const cols = Array.from({ length: n }, () => []);
    const heights = new Array(n).fill(0);
  
    arr.forEach((item) => {
      const shortest = heights.indexOf(Math.min(...heights));
      cols[shortest].push(item);
      heights[shortest] += item.height;
    });
  
    return cols;
  };
  
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
        // <div key={rowIndex} className='vertical-row'>
        //   {row.map((url) => (
        //     <img
        //       key={url}
        //       src={url}
        //       onClick={() => onImageClick(url)}
        //       alt='img'
        //       className='gallery-img'
        //     />
        //   ))}
        // </div>
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
  )
}

export default Gallery
