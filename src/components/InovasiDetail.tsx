import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './NewsDetail.css';


const InovasiDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [inovasiDetail, setInovasiDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInovasiDetail = async () => {
      const { data, error } = await supabase
        .from('inovasi_LAN')
        .select('*') // Fetch data
        .eq('id', id) // Filter by the specific item ID
        .single(); // Since we're fetching one item, we use `.single()`

      if (error) {
        setError(error);
      } else {
        setInovasiDetail(data);
      }
      setLoading(false);
    };

    fetchInovasiDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching news: {error.message}</p>;
  }

  return (
    <div className="news-detail">
      {inovasiDetail && (
        <>
          <h1 className="news-title">{inovasiDetail.nama_inovasi}</h1>
          <img className="news-detail-image" src={inovasiDetail.image_link} alt={inovasiDetail.nama_inovasi} />
          <p className="news-date">{inovasiDetail.nama_instansi}</p>
          <div className="news-description" dangerouslySetInnerHTML={{ __html: inovasiDetail.deskripsi }}></div>
        </>
      )}
    </div>
  );
};

export default InovasiDetail;
