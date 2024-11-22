import React, { useState } from 'react';

const PrediksiPangkat = () => {
    const [currentRank, setCurrentRank] = useState('');
    const [predictedRank, setPredictedRank] = useState('');

    const handlePredict = () => {
        // Simple prediction logic (for demonstration purposes)
        const rankMap = {
            'Junior': 'Mid-level',
            'Mid-level': 'Senior',
            'Senior': 'Lead'
        };
        setPredictedRank(rankMap[currentRank] || 'Unknown');
    };

    return (
        <div>
            <h1>Prediksi Pangkat</h1>
            <div>
                <label>
                    Pangkat Saat Ini:
                    <input 
                        type="text" 
                        value={currentRank} 
                        onChange={(e) => setCurrentRank(e.target.value)} 
                    />
                </label>
            </div>
            <button onClick={handlePredict}>Prediksi Pangkat</button>
            {predictedRank && (
                <div>
                    <h2>Pangkat yang Diprediksi: {predictedRank}</h2>
                </div>
            )}
        </div>
    );
};

export default PrediksiPangkat;