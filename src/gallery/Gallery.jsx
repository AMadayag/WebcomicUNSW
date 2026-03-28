import './Gallery.css'

function Gallery() {
  const gallery_images = Object.entries(
    import.meta.glob("/src/assets/gallery/*.png", { eager: true })
  );

  const chunkArray = (arr, n) => // splits up gallery folder to chunks for rows
    Array.from({ length: n }, (_, i) => arr.filter((_, idx) => idx % n === i)
  );

  const rows = chunkArray(gallery_images, 3);

  return (
    <div className='gallery-container'>
      <div className='vertical-row-text'>
        <a>Gallery</a>
        <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec convallis leo dolor. Donec ullamcorper odio sed maximus feugiat.
          Sed id ligula fermentum, gravida diam ac, ornare leo. In aliquam
          placerat sem, vitae maximus ex dignissim nec.</a>
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className='vertical-row'>
          {row.map(([path, module]) => (
            <img key={path} src={module.default} alt='img' className='gallery-img' />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Gallery
