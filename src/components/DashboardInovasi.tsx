import { useState, useEffect } from "react";
import './InteractiveMap.css';
import { supabase } from '../supabaseClient';

function DashboardInovasi() {
    
    interface LabinovData {
        Id_kabkot: number;
        DRUMP_UP: string;
        DIAGNOSE: string;
        DESAIN: string;
        DELIVER_LAUNCHING: string;
        DELIVER_MONITORING: string;
        DISPLAY: string;
        HASIL_AKHIR: string;
        master_kabupaten: {
            nama_kabkot: string;
            master_provinsi: {
                nama_provinsi: string;
            };
        };
    }

    const [data, setData] = useState<LabinovData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: labinovData, error } = await supabase
                    .from('Labinov')
                    .select(`
                        Id_kabkot,
                        DRUMP_UP,
                        DIAGNOSE,
                        DESAIN,
                        DELIVER_LAUNCHING,
                        DELIVER_MONITORING,
                        DISPLAY,
                        HASIL_AKHIR,
                        master_kabupaten (
                            nama_kabkot,
                            master_provinsi (
                                nama_provinsi
                            )
                        )
                    `);

                if (error) {
                    console.error("Error fetching data:", error);
                    return;
                }

                setData(labinovData);
            } catch (err) {
                console.error("Error:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="app">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', width: '100%', maxWidth: '1200px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
                    DASHBOARD LAB INOVASI
                </h1>
                <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />

                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Cari Daerah Lab Inovasi"
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

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>PROVINSI</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>KABUPATEN/KOTA</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DRUM UP</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DIAGNOSE</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DESAIN</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DELIVER<br/>LAUNCHING</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DELIVER<br/>MONITORING</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DISPLAY</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(
                            data
                                .filter(item =>
                                    item.master_kabupaten.nama_kabkot.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.master_kabupaten.master_provinsi.nama_provinsi.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .reduce((acc, item) => {
                                    const provinsi = item.master_kabupaten.master_provinsi.nama_provinsi;
                                    if (!acc[provinsi]) acc[provinsi] = [];
                                    acc[provinsi].push(item);
                                    return acc;
                                }, {} as Record<string, LabinovData[]>)
                        ).map(([provinsi, items]) => (
                                <>
                                    <tr key={provinsi} style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }} colSpan={9}>{provinsi}</td>
                                    </tr>
                                    {items.map((item, index) => (
                                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}></td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.master_kabupaten.nama_kabkot}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.DRUMP_UP}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.DIAGNOSE}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.DESAIN}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.DELIVER_LAUNCHING}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.DELIVER_MONITORING}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.DISPLAY}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.HASIL_AKHIR}</td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                    </tbody>
                </table>

            </div>
        </div>
    </div>
);
}


export default DashboardInovasi;
