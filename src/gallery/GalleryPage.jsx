import { useState } from "react"
import Gallery from "./Gallery"
import GalleryCloseup from "./GalleryCloseup"

function GalleryPage() {
  const [closeUpImg, setCloseUpImg] = useState(null)

  return (
    <>
      {!closeUpImg && <Gallery onImageClick={(selectedSrc) => setCloseUpImg(selectedSrc)} />}
      {closeUpImg && <GalleryCloseup img_src={closeUpImg} onClose={() => setCloseUpImg(null)} />}
    </>
  )
}

export default GalleryPage
