import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC = () => {
  // Data gambar yang diambil dari folder publik
  const news = [
    {
      id: 1,
      title: "Khallurrahman",
      image_url: "/Khalilurrahman.jpg",
    },
    {
      id: 2,
      title: "Herwin",
      image_url: "/herwin.jpg",
    },
    {
      id: 3,
      title: "Sutarmiji",
      image_url: "/sutarmiji.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1, // Menampilkan 1 gambar sekaligus
    slidesToScroll: 1, // Menggeser 1 gambar sekaligus
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full mx-auto">
        <Slider {...settings}>
          {news.map((item) => (
            <div key={item.id} className="relative flex flex-col items-center justify-center">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-[500px] object-cover rounded-xl shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/fallback-image.jpg"; // Ganti dengan gambar fallback jika ada kesalahan
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
