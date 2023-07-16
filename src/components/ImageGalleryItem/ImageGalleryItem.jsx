

export function ImageGalleryItem({src, alt}) {
    
    return (
      <li className="gallery-item">
        <img className="item-image" src={src} alt={alt} />
      </li>
    );
}