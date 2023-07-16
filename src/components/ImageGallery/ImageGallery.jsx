import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"; 

export function ImageGallery({ images }) {
    return <ul className="gallery">
      
        {images.map((image) => {
            return(
                <ImageGalleryItem key={image.id}
                    src={image.webformatURL}
                    alt={image.tags}
                />)
            
        })}

  </ul>;
}
