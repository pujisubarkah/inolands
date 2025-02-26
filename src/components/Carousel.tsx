import React, { useState } from 'react';
import './Carousel.css'; // Menggunakan file CSS terpisah
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient'; // Import supabase client

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from Supabase
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('dokumens')
      .select('*');

    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data);
    }
  };

  // Fetch images on component mount
  React.useEffect(() => {
    fetchImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
      INFOGRAFIS INOVASI
    </h1>
    <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />
    
      <div className="carousel">
        <button onClick={prevSlide} className="carousel-button-prev">
          <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" color="white" />
        </button>
        <div className="carousel-images">
          {images.length > 0 && [...Array(3)].map((_, i) => {
            const index = (currentIndex + i) % images.length;
            return (
              <img 
                key={index}
                src={images[index].link}
                alt={`Slide ${index}`}
                className="carousel-image"
              />
            );
          })}
        </div>
        <button onClick={nextSlide} className="carousel-button-next">
          <FontAwesomeIcon icon={faCircleArrowRight} size="2x" color="white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
