import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Carousel: React.FC = () => {
  const [news, setNews] = useState<{ id: number; title: string; image_url: string }[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/berita/latest");
        if (Array.isArray(response.data) && response.data.every(item => item?.image_url && item?.title)) {
          setNews(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const NextArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-transparent border-none cursor-pointer z-10 hover:scale-110 transition-transform"
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faCircleArrowRight} size="2x" color="white" />
      </button>
    );
  };

  const PrevArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-transparent border-none cursor-pointer z-10 hover:scale-110 transition-transform"
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" color="white" />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#16578d] to-[#0c2d4b] flex flex-col items-center justify-center">
      {/* Teks Berjalan */}
      <div className="w-full overflow-hidden whitespace-nowrap mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg tracking-wide animate-marquee">
          EVERYONE CAN INNOVATE 🚀 EVERYONE CAN INNOVATE 🚀 EVERYONE CAN INNOVATE 🚀
        </h1>
      </div>

      {/* Carousel */}
      <div className="relative w-4/5 max-w-4xl">
        <Slider {...settings}>
          {news.map((item) => (
            <div key={item.id} className="relative flex flex-col items-center justify-center">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-[500px] object-cover rounded-xl shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/fallback-image.jpg";
                }}
              />

              {/* Tulisan di dalam gambar yang bisa diklik */}
              <div className="absolute bottom-5 w-full text-center px-5">
                <a
                  href={`/berita/${item.id}`}
                  className="text-lg font-semibold text-white bg-black bg-opacity-60 py-2 px-4 rounded-lg inline-block hover:bg-opacity-80 transition"
                >
                  {item.title}
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;

