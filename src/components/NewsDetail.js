import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './NewsDetail.css';


const NewsDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      const { data, error } = await supabase
        .from('beritas')
        .select('*')
        .eq('id', id)
        .single(); // Mengambil satu berita berdasarkan ID

      if (error) {
        setError(error);
      } else {
        setNewsDetail(data);
      }
      setLoading(false);
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching news: {error.message}</p>;
  }

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
