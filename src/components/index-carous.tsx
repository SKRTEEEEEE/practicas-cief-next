import Image from "next/image";
import { useState } from "react";

export const IndexCarrousel = ({totalItems, photos, index, nombre}: {totalItems: number, photos: string[],index:number, nombre:string}) => {
    const [currentImageIndexes, setCurrentImageIndexes] = useState(
        new Array(totalItems).fill(0)
      );
    const handleNextPhoto = (index:number, photos: string[]) => {
        setCurrentImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[index] =
            prevIndexes[index] === photos.length - 1 ? 0 : prevIndexes[index] + 1;
          return newIndexes;
        });
      };
    
      const handlePreviousPhoto = (index:number, photos:string[]) => {
        setCurrentImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[index] =
            prevIndexes[index] === 0 ? photos.length - 1 : prevIndexes[index] - 1;
          return newIndexes;
        });
      };
    return (
        <div className="image-container">
        <Image
        height={1000}
        width={3000}
        className="img-disp"
        src={photos[currentImageIndexes[index]]}
        alt={nombre}
        />
        {photos.length > 1 && (
        <div className="image-controls">
            <button
            onClick={() => handlePreviousPhoto(index, photos)}
            className="btn-control"
            >
            &#10094;
            </button>
            <button
            onClick={() => handleNextPhoto(index, photos)}
            className="btn-control"
            >
            &#10095;
            </button>
        </div>
        )}
    </div>
    );
}