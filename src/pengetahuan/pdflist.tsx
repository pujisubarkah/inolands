import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../components/NewsGrid.css';

const Direktori = () => {
    const navigate = useNavigate();

    interface NewsItem {
      id: number;
      title: string;
      image: string;
      pemda: string;
      date: string; // Add date property
    }
    
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // Track total item count
  
    const itemsPerPage = 12;
  
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages dynamically
  
    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
    };
  
// Fetch data including total item count
const fetchBeritaFromSupabase = async () => {
  try {
    const { data, error, count } = await supabase
      .from('pdflist')
      .select('*', { count: 'exact' })

    if (error) throw error;

    setTotalItems(count); // Set the total number of items
    const formattedData = data.map((item: any) => ({
      id: item.id,
      title: item.pdf_judul,
      image: item.pdf_cover,
      date: item.pdf_date, // Ensure date is included in the formatted data
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

  const handleItemClick = (id: number) => {
    navigate(`/direktori/${id}`);
  };

  // Menghitung item yang ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  const sortedItems = currentItems.sort((a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="app">
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
        DIREKTORI INOVASI
      </h1>
      <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />
      <div className="news-grid">
        {sortedItems.map((item: NewsItem) => (
          <div key={item.id} className="news-item" onClick={() => handleItemClick(item.id)}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "360px",
                objectFit: "cover",
                borderRadius: "10px 10px 0 0", // Rounded top corners
              }}
            />

            <div className="news-content">
              <h3><b>{item.title}</b></h3>
              <p style={{ color: '#16578d' }}>{item.pemda}</p>
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

export default Direktori;
