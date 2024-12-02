import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../components/NewsDetail.css';


const PdfDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [inovasiDetail, setInovasiDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInovasiDetail = async () => {
      const { data, error } = await supabase
        .from('pdflist')
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
          <h1 className="news-title">{inovasiDetail.pdf_judul}</h1>
          <p className="news-date">{inovasiDetail.pdf_publisher}</p>
          <iframe src={inovasiDetail.pdf_url} width="720" height="1000" allow="autoplay"></iframe>
        </>
      )}
    </div>
  );
};

export default PdfDetail;
