import './Gallery.css'
import { gallery_images } from './GalleryImages';

function Gallery({ onImageClick }) {
  const chunkArray = (arr, n) => // splits up gallery folder to chunks for rows
    Array.from({ length: n }, (_, i) => arr.filter((_, idx) => idx % n === i)
  );

  const rows = chunkArray(gallery_images, 3);

  return (
    <div className='gallery-container'>
      <div className='vertical-row-text'>
        <a><h2>Gallery</h2></a>
        <a>Showing off all our wonderful artists and their
          <b> delicious</b> work.</a>
        <a>Everything you see here is made by society members!</a>
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className='vertical-row'>
          {row.map(([path, module]) => (
            <img
              key={path}
              src={module.default}
              onClick={() => onImageClick(module.default)}
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
