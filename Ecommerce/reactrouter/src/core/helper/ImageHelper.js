import React from 'react'

function ImageHelper({ product }) {
  const imageUrl = product ? product.image
    : 'https://cdn3.iconfinder.com/data/icons/file-and-folder-outline-icons-set/144/Image_Error-512.png'

  return (
    <div className='rounded border border-success p-2 d-flex' style={{ height: "170px", maxWidth: "100%", justifyContent: "center" }}>
      <img src={imageUrl} alt='' style={{ maxHeight: "100%", maxWidth: "130%", width: "auto", height: "auto" }} className='card-img'></img>
    </div>
  )
}

export default ImageHelper