"use client"

import Image from "next/image";
import images from "../data/backgroundIMG.json";
import { useState } from "react";

export const SlideImage =  () => {
    const [slideIndex, setSlideIndex] = useState<number>(1);

    const plusSlides = (n: number) => {
        let newIndex = slideIndex + n;
        if (newIndex > images.length) {
          newIndex = 1;
        } else if (newIndex < 1) {
          newIndex = images.length;
        }
        setSlideIndex(newIndex);
      };

    const currentSlide = (n:number) => setSlideIndex(n);

    return (
        <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`mySlides fade ${
              slideIndex === index + 1 ? "active" : ""
            }`}
            style={{ display: slideIndex === index + 1 ? "block" : "none" }}
          >
            <Image
              className="img-head"
              src={image.src}
              width={3000}
              height={1000}
              alt={`Slide ${index + 1}`}
            />
            <div className="dots-container">
              {images.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`dot ${
                    slideIndex === dotIndex + 1 ? "active" : ""
                  }`}
                  onClick={() => currentSlide(dotIndex + 1)}
                ></span>
              ))}
            </div>
          </div>
        ))}
        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
      </div>
    );
}