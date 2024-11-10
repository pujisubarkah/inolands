import React, { useEffect, useState } from 'react';
import NewsGrid from './NewsGrid';
import Pagination from './Pagination';
import { supabase } from '../supabaseClient'; // Import supabase client

const Berita = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Tentukan jumlah item per halaman

  // Fetch berita from Supabase
  const fetchBerita = async () => {
    const { data, error } = await supabase
      .from('beritas')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
    } else {
      // Format data yang difetch agar sesuai dengan komponen `NewsGrid`
      const formattedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image_url, // Sesuaikan dengan atribut yang ada di API Supabase
        description: item.deskripsi,
        date: item.date,
      }));

      setNewsItems(formattedData);
    }
  };

  // Fetch berita ketika komponen dipasang
  useEffect(() => {
    fetchBerita();
  }, []);

 // Menghitung item yang ditampilkan pada halaman saat ini
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

 // Fungsi untuk mengganti halaman
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 return (
  <div className="app">
    <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0' }}>
      BERITA INOVASI
    </h1>
    <NewsGrid items={currentItems} />
    <Pagination
      itemsPerPage={itemsPerPage}
      totalItems={newsItems.length}
      paginate={paginate}
      currentPage={currentPage}
    />
  </div>
);
};

export default Berita;
