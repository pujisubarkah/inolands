import React from 'react';

const PegawaiStruktural = () => {
    return (
        <div>
            <h1>Daftar Pegawai Struktural</h1>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Jabatan</th>
                        <th>Unit Kerja</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Data pegawai struktural akan ditampilkan di sini */}
                </tbody>
            </table>
        </div>
    );
};

export default PegawaiStruktural;