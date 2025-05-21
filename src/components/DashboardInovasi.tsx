import { useState, useEffect } from "react";
import './InteractiveMap.css';
import axios from "axios";

function DashboardInovasi() {
    interface Inovasi {
        id: number;
        judul_inovasi: string;
        sdgs?: {
            image: string;
            sdgs: string;
        };
        tahun: number;
        kld: string;
        inovator: string;
        deskripsi: string;
    }

    const [inovasiData, setInovasiData] = useState<Inovasi[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        loadInovasi();
    }, []);

    const loadInovasi = async () => {
        try {
            const response = await axios.get('/api/inolands');
            setInovasiData(Array.isArray(response.data) ? response.data : []); 
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching inovasi:", error);
        }
    };

    const filteredInovasi = (inovasiData || []).filter((inovasi) => {
    return searchTerm === '' ||
        (inovasi.judul_inovasi?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (inovasi.tahun?.toString() || '').includes(searchTerm.toLowerCase()) ||
        (inovasi.kld?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (inovasi.inovator?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (inovasi.deskripsi?.toLowerCase() || '').includes(searchTerm.toLowerCase());
});

    const totalPages = Math.ceil(filteredInovasi.length / itemsPerPage);
    const currentInovasi = filteredInovasi.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSort = (field: keyof Inovasi) => {
        const sortedData = [...inovasiData].sort((a, b) => {
            if (a[field] === undefined) return 1;
            if (b[field] === undefined) return -1;
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setInovasiData(sortedData);
    };

    return (
        <div className="app">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', width: '100%', maxWidth: '1200px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
                    TEMUKAN INOVASI
                </h1>
                <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />

                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Cari Ide Inovasi/Pemda/Inovator"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '10px 10px 10px 30px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                width: '350px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                        <i className="fas fa-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }}></i>
                    </div>
                </div>

                {currentInovasi.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', margin: '20px 0' }}>
                        
                        <thead>
                            <tr style={{ backgroundColor: '#444', color: 'white', textAlign: 'left' }}>
                                <th style={{ padding: '15px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('judul_inovasi')}>
                                    Judul Inovasi
                                </th>
                                <th style={{ padding: '15px', width: '175px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('sdgs')}>
                                    SDGS
                                </th>
                                <th style={{ padding: '15px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('tahun')}>
                                    Tahun
                                </th>
                                <th style={{ padding: '15px', width: '125px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('kld')}>
                                    Pemda
                                </th>
                                <th style={{ padding: '15px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('inovator')}>
                                    Inovator
                                </th>
                                <th style={{ padding: '15px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('deskripsi')}>
                                    Deskripsi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentInovasi.map((inovasi) => (
                                <tr key={inovasi.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '15px' }}>{inovasi.judul_inovasi}</td>
                                    <td style={{ padding: '15px', width: '175px' }}>
                                        <img width='75px' src={inovasi.sdgs ? inovasi.sdgs.image : ''}></img>
                                        <div>{inovasi.sdgs ? inovasi.sdgs.sdgs : 'N/A'}</div>
                                    </td>
                                    <td style={{ padding: '15px' }}>{inovasi.tahun}</td>
                                    <td style={{ padding: '15px', width: '125px' }}>{inovasi.kld}</td>
                                    <td style={{ padding: '15px' }}>{inovasi.inovator}</td>
                                    <td style={{ padding: '15px' }}>{inovasi.deskripsi}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ textAlign: 'center' }}>Tidak ada inovasi yang ditemukan.</p>
                )}

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
        </div>
    </div>
);
}


export default DashboardInovasi;
