import React from 'react'
import { API } from '../../backend'


const ImageHelper = ({product}) => {
    console.log(product.photo);
    let imageurl = product ? 
        `${API}/product/photo/${product._id}` 
        : 'https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg'
    return (
        <div className="rounded border border-success p-2">
          <img
            src={imageurl}
            alt="photo"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
          />
        </div>
    )
}

export default ImageHelper
