import React, { useEffect, useState } from 'react';

const Tuxe = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 20; // Tentukan jumlah item per halaman
  const totalPages = 100;

  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
  };

  // Fetch berita from API
  const fetchBeritaFromAPI = async () => {
    try {
      const offset = (currentPage - 1) * 20;
      const response = await fetch(`https://api.indeks.inovasi.litbang.kemendagri.go.id/tuxe/new-release?offset=${offset}`);
      const data = await response.json();

      // Format data yang difetch agar sesuai dengan komponen `NewsGrid`
      const formattedData = data.inovasi.map((item) => ({
        id: item.id,
        title: item.nama,
        image: item.indikator_video.thumbnail_url, // Sesuaikan dengan atribut yang ada di API
        pemda: item.pemda,
        date: item.waktu,
      }));

      setNewsItems(formattedData);
      console.log('api:', response.url);
    } catch (error) {
      console.error('Error fetching news from API:', error);
    }
  };

  // Fetch berita ketika komponen dipasang
  useEffect(() => {
    fetchBeritaFromAPI();
  }, [currentPage]);

  const handleItemClick = (id) => {
    window.open(`https://tuxedovation.inovasi.litbang.kemendagri.go.id/detail_inovasi/${id}`, '_blank');
  };

 // Menghitung item yang ditampilkan pada halaman saat ini
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);


 const sortedItems = currentItems.sort((a, b) => new Date(b.date) - new Date(a.date));




 return (
  <div className="app">
    <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
      TUXEDOVATION KEMENDAGRI
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
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}
  </div>
);
};

export default Tuxe;
