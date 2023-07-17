

export function ImageGalleryItem({src, alt, modalSrc,onImgClick}) {
    
    return (
      <li className="gallery-item">
        <img
          className="item-image"
          src={src}
          alt={alt}
          onClick={()=>onImgClick(modalSrc, alt)}
        />
      </li>
    );
}