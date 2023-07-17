import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"; 

export function ImageGallery({ images, onImgClick }) {
  return (
    <ul className="gallery">
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            modalSrc={image.largeImageURL}
            onImgClick={onImgClick}
          />
        );
      })}
    </ul>
  );
}
