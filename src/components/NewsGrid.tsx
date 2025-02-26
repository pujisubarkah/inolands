import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsGrid.css';

interface NewsItem {
  id: string;
  image: string;
  title: string;
  date: string;
}

interface NewsGridProps {
  items: NewsItem[];
}

  const NewsGrid: React.FC<NewsGridProps> = ({ items }) => {
    const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  const sortedItems = items.sort((a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="news-grid">
      {sortedItems.map((item: NewsItem) => (
        <div key={item.id} className="news-item" onClick={() => handleItemClick(item.id)}>
          <img src={item.image} alt={item.title} className="news-image" />
          <div className="news-content">
            <h3><b>{item.title}</b></h3>
            <p style={{ color: '#16578D' }}>{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
