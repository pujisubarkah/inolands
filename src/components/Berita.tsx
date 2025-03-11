import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';

const Berita = () => {
  interface NewsItem {
    id: number;
    title: string;
    image: string;
    description: string;
    date: string;
  }

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get('/api/berita');
        const data = response.data;

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

    fetchBerita();
  }, []);

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const currentItems = newsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold font-poppins">🔥 Update Terkini untuk Sobat Inovasi! Simak Beritanya</h1>
        <p className="text-gray-500 mt-2">{new Date().toLocaleDateString()}</p>
      </header>

      {/* Berita Utama */}
      {newsItems.length > 0 && (
        <section className="mb-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <img src={newsItems[0].image} alt={newsItems[0].title} className="w-full h-full object-cover brightness-110" />
            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
              <h2 className="text-white text-2xl font-bold hover:underline cursor-pointer" onClick={() => navigate(`/berita/${newsItems[0].id}`)}>
                {newsItems[0].title}
              </h2>
            </div>
          </div>
        </section>
      )}

      {/* Daftar Berita dengan Pagination */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 font-poppins">Berita Lainnya</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {currentItems.map((news) => (
            <div key={news.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-32 h-20 flex-shrink-0">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold hover:underline cursor-pointer" onClick={() => navigate(`/berita/${news.id}`)}>
                  {news.title}
                </h3>
                <p className="text-gray-500 text-xs mt-2">{news.date}</p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination itemsPerPage={itemsPerPage} totalItems={newsItems.length} paginate={setCurrentPage} currentPage={currentPage} />
        )}
      </section>
    </div>
  );
};

export default Berita;
