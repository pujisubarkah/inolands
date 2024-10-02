import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Berita.css'; // Pastikan untuk membuat file CSS terpisah

const Berita = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Mengambil data dari API Strapi
    axios.get('http://localhost:1337/api/beritas?populate=*') // Sesuaikan URL API Strapi
      .then(response => {
        setNews(response.data.data); // Sesuaikan dengan struktur API Strapi
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div className="news-list">
      <div className="featured-news">
        {news.length > 0 && (
          <div className="news-item large">
            {/* Mengambil URL gambar dari berita pertama */}
            <img 
              src={news[0]?.attributes?.gambar?.formats?.large?.url 
                ? `http://localhost:1337${news[0].attributes.gambar.formats.large.url}` 
                : '/path/to/placeholder.jpg'} 
              alt="News Image" 
            />
            <div className="news-content">
              <p>{news[0]?.attributes?.berita}</p>
              <a href={`/news/${news[0]?.id}`}>Selengkapnya</a>
            </div>
          </div>
        )}
      </div>
      <div className="other-news">
        {news.slice(1).map(item => (
          <div className="news-item small" key={item.id}>
            {/* Mengambil URL gambar dari berita lainnya */}
            <img 
              src={item?.attributes?.gambar?.formats?.small?.url 
                ? `http://localhost:1337${item.attributes.gambar.formats.small.url}` 
                : '/path/to/placeholder.jpg'} 
              alt="News Image" 
            />
            <div className="news-content">
              <p>{item?.attributes?.berita}</p>
              <a href={`/news/${item.id}`}>Selengkapnya</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Berita;


