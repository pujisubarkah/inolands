import { useState, useEffect } from "react";
import './InteractiveMap.css';
import { supabase } from '../supabaseClient';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function DashboardInovasi() {

    const pieData = {
        labels: ['KABUPATEN', 'KOTA', 'PROV'],
        datasets: [
            {
                data: [89, 30, 1],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const barData = {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'KAB',
                data: [3, 10, 12, 23, 15, 8, 12, 19, 9, 4],
                backgroundColor: '#FF6384',
            },
            {
                label: 'KOTA',
                data: [1, 3, 7, 7, 9, 1, 2, 6, 1, 2],
                backgroundColor: '#36A2EB',
            },
            {
                label: 'PROV',
                data: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: '#FFCE56',
            },
        ],
    };

    const optionsBarData = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Lokus Lab Inovasi Per Tahun dan Jenis Daerah',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const barDataJilid = {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'JILID 1',
                data: [4, 13, 20, 27, 21, 7, 11, 18, 6, 0],
                backgroundColor: '#FF6384',
            },
            {
                label: 'JILID 2',
                data: [0, 0, 0, 3, 3, 1, 2, 6, 1, 3],
                backgroundColor: '#36A2EB',
            },
            {
                label: 'JILID 3',
                data: [0, 0, 0, 0, 0, 1, 0, 1, 3, 1],
                backgroundColor: '#FFCE56',
            },
            {
                label: 'JILID 4',
                data: [0, 0, 0, 0, 0, 0, 1, 0, 0, 2],
                backgroundColor: '#4BC0C0',
            },
        ],
    };

    const optionsBarDataJilid = {
        indexAxis: 'y' as const, // This makes the bar chart horizontal
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Lokus Lab Inovasi Per Tahun dan Jilid',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    
    interface LabinovData {
        Id_kabkot: number;
        session: number;
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
                        session,
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

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', width: '100%', padding: '16px' }}>
                    <div style={{ flex: '1 1 0', maxWidth: '450px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
                        <Pie data={pieData} />
                    </div>

                    <div style={{ flex: '1 1 0', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ height: '300px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', padding: '12px' }}>
                            <Bar data={barData} options={optionsBarData} />
                        </div>
                        <div style={{ height: '300px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', padding: '12px' }}>
                            <Bar data={barDataJilid} options={optionsBarDataJilid} />
                        </div>
                    </div>
                </div>

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
                                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.master_kabupaten.nama_kabkot} {item.session}</td>
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
