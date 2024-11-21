import React, { useState } from 'react';

const ListPermohonan = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const data = [
        // Add your data here
    ];

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '10px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListPermohonan;
const data = [
    { waktu: '2023-10-01', namaPegawai: 'John Doe', namaEditor: 'Jane Smith' },
    { waktu: '2023-10-02', namaPegawai: 'Alice Johnson', namaEditor: 'Bob Brown' },
    // Add more data as needed
];

const filteredData = data.filter(item =>
    item.namaPegawai.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <div>
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ marginBottom: '10px' }}
        />
        <table>
            <thead>
                <tr>
                    <th>Waktu</th>
                    <th>Nama Pegawai</th>
                    <th>Nama Editor</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.waktu}</td>
                        <td>{item.namaPegawai}</td>
                        <td>{item.namaEditor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div style={{ marginTop: '10px' }}>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
)