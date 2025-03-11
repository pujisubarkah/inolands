import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsGrid from './NewsGrid';
import Pagination from './Pagination';

const Berita = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Fetch berita menggunakan axios
  const fetchBerita = async () => {
    try {
      const response = await axios.get('/api/berita');
      const data = response.data;

      // Sesuaikan format data dengan komponen `NewsGrid`
      const formattedData = data.map((item: { id: number; title: string; image_url: string; deskripsi: string; date: string }) => ({
        id: item.id,
        title: item.title,
        image: item.image_url,
        description: item.deskripsi,
        date: item.date,
      }));

      setNewsItems(formattedData);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const currentItems = newsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="app">
      <h1 className="text-center text-2xl font-bold font-poppins mt-5">BERITA INOVASI</h1>
      <hr className="w-24 h-1 bg-gradient-to-r from-blue-800 via-black to-blue-800 mx-auto my-5" />
      
      <NewsGrid items={currentItems} />
      
      {totalPages > 1 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={newsItems.length}
          paginate={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Berita;
