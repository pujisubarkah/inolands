import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/NewsGrid.css';

const Direktori = () => {
  const navigate = useNavigate();

  interface NewsItem {
    id: number;
    title: string;
    keterangan: string;
    image: string;
    pemda: string;
    fileUrl: string;
    date: string;
  }

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchBeritaFromApi = async () => {
    try {
      const response = await fetch('https://proxy.cors.sh/https://jippnas.menpan.go.id/fetch_model');
      const result = await response.json();

      const formattedData = result.model.map((item: any) => ({
        id: item.id,
        title: item.judul,
        keterangan: item.keterangan,
        image: `https://jippnas.menpan.go.id/storage/${item.gambar}`,
        pemda: item.pemda,
        fileUrl: `https://jippnas.menpan.go.id/${item.file}`,
        date: item.created_at,
      }));

      setTotalItems(result.model.length);
      setNewsItems(formattedData);
    } catch (error) {
      console.error('Error fetching news from API:', error);
    }
  };

  useEffect(() => {
    fetchBeritaFromApi();
  }, [currentPage]);

  const handleItemClick = (id: number) => {
    const item = newsItems.find((newsItem) => newsItem.id === id);
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  const sortedItems = currentItems.sort(
    (a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="app">
      <h1
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center',
          margin: '20px 0 10px 0',
        }}
      >
        MODEL INOVASI
      </h1>
      <hr
        style={{
          width: '100px',
          border: 'none',
          height: '2px',
          background: 'linear-gradient(to right, #16578d, black, #16578d)',
          margin: '0 auto 20px auto',
        }}
      />
      <div className="news-grid">
        {sortedItems.map((item: NewsItem) => (
          <div key={item.id} className="news-item" onClick={() => handleItemClick(item.id)}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '360px',
                objectFit: 'cover',
                borderRadius: '10px 10px 0 0',
              }}
            />
            <div className="news-content">
              <h3>
                <b>{item.title}</b>
              </h3>
              <p style={{ color: '#16578d' }}>{item.pemda}</p>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              style={{
                padding: '5px 10px',
                margin: '0 5px',
                border: 'none',
                borderRadius: '3px',
                backgroundColor: '#f9f9f9',
                color: '#000',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Prev
            </button>
          )}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = currentPage > 3 ? currentPage - 2 + i : i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{
                  padding: '5px 10px',
                  margin: '0 5px',
                  border: 'none',
                  borderRadius: '3px',
                  backgroundColor: currentPage === pageNumber ? '#444' : '#f9f9f9',
                  color: currentPage === pageNumber ? '#fff' : '#000',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {pageNumber}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                padding: '5px 10px',
                margin: '0 5px',
                border: 'none',
                borderRadius: '3px',
                backgroundColor: '#f9f9f9',
                color: '#000',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Next
            </button>
          )}
        </div>
      )}
      {selectedItem && (
  <div className="popup-overlay" onClick={handleClosePopup}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      {/* Tombol Close */}
      <span className="close" onClick={handleClosePopup}>
        &times;
      </span>

      {/* Baris Pertama: Judul */}
      <h2 style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '1.5rem', color: '#16578d' }}>
        {selectedItem.title}
      </h2>

      {/* Baris Kedua: Gambar dan Deskripsi */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Kolom Kiri: Gambar */}
        <div>
          <img
            src={selectedItem.image}
            alt={selectedItem.title}
            style={{
              width: '150px',
              height: 'auto',
              borderRadius: '10px',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Kolom Kanan: Deskripsi dan Tombol Unduh */}
        <div style={{ flex: 1 }}>
          {/* Deskripsi */}
          <p style={{ marginBottom: '20px', fontSize: '1rem', lineHeight: '1.6' }}>
            <div dangerouslySetInnerHTML={{ __html: selectedItem.keterangan }} />
          </p>

          {/* Tombol Unduh */}
          <button
            onClick={() => handleDownload(selectedItem.fileUrl)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#16578d',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Download Buku
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Direktori;
