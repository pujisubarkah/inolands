import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './NewsGrid.css';

const InovasiLAN = () => {
    const navigate = useNavigate();

    const [newsItems, setNewsItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // Track total item count
  
    const itemsPerPage = 12;
  
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages dynamically
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
// Fetch data including total item count
const fetchBeritaFromSupabase = async () => {
  try {
    const { data, error, count } = await supabase
      .from('inovasi_LAN')
      .select('id, nama_inovasi, image_link, nama_instansi', { count: 'exact' })

    if (error) throw error;

    setTotalItems(count); // Set the total number of items
    const formattedData = data.map((item) => ({
      id: item.id,
      title: item.nama_inovasi,
      image: item.image_link,
      pemda: item.nama_instansi,
    }));

    setNewsItems(formattedData);
  } catch (error) {
    console.error('Error fetching news from Supabase:', error);
  }
};



  // Fetch berita ketika komponen dipasang
  useEffect(() => {
    fetchBeritaFromSupabase();
  }, [currentPage]);

  const handleItemClick = (id) => {
    navigate(`/inovasi/${id}`);
  };

  // Menghitung item yang ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const sortedItems = currentItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="app">
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
        LIST INOVASI
      </h1>
      <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, red, black, red)', margin: '0 auto 20px auto' }} />
      <div className="news-grid">
        {sortedItems.map((item) => (
          <div key={item.id} className="news-item" onClick={() => handleItemClick(item.id)}>
            <img src={item.image} alt={item.title} className="news-image" />
            <div className="news-content">
              <h3><b>{item.title}</b></h3>
              <p style={{ color: 'darkred' }}>{item.pemda}</p>
            </div>
          </div>
        ))}
      </div>
          {totalPages > 1 && (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)} style={{ padding: '5px 10px', margin: '0 5px', border: 'none', borderRadius: '3px', backgroundColor: '#f9f9f9', color: '#000', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Prev
            </button>
          )}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = currentPage > 3 ? currentPage - 2 + i : i + 1;
            return (
              <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} style={{ padding: '5px 10px', margin: '0 5px', border: 'none', borderRadius: '3px', backgroundColor: currentPage === pageNumber ? '#444' : '#f9f9f9', color: currentPage === pageNumber ? '#fff' : '#000', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {pageNumber}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)} style={{ padding: '5px 10px', margin: '0 5px', border: 'none', borderRadius: '3px', backgroundColor: '#f9f9f9', color: '#000', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InovasiLAN;
