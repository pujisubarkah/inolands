import React, { useState } from 'react';

const RencanaAksi = () => {
    const [plans, setPlans] = useState(Array(12).fill(''));

    const handleChange = (index, event) => {
        const newPlans = [...plans];
        newPlans[index] = event.target.value;
        setPlans(newPlans);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Rencana Aksi:', plans);
    };

    return (
        <form onSubmit={handleSubmit}>
            {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((month, index) => (
                <div key={index}>
                    <label>
                        {month}:
                        <input
                            type="text"
                            value={plans[index]}
                            onChange={(event) => handleChange(index, event)}
                        />
                    </label>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default RencanaAksi;