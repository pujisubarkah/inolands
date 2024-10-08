import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsGrid.css';

const NewsGrid = ({ items }) => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="news-grid">
      {items.map((item) => (
        <div key={item.id} className="news-item" onClick={() => handleItemClick(item.id)}>
          <img src={item.image} alt={item.title} className="news-image" />
          <div className="news-content">
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
