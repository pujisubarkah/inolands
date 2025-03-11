import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './NewsDetail.css';

interface NewsDetailType {
  title: string;
  date: string;
  deskripsi: string;
  image_url: string;
}

const NewsDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [newsDetail, setNewsDetail] = useState<NewsDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`/api/berita/${id}`);
        setNewsDetail(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setLoading(false);
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching news: {error}</p>;

  return (
    <div className="news-detail">
      {newsDetail && (
        <>
          <h1 className="news-title">{newsDetail.title}</h1>
          <img className="news-detail-image" src={newsDetail.image_url} alt={newsDetail.title} />
          <p className="news-date">{newsDetail.date}</p>
          <p className="news-description">{newsDetail.deskripsi}</p>
        </>
      )}
    </div>
  );
};

export default NewsDetail;
