import React from 'react';
import './VideoSection.css'; // Pastikan untuk membuat file CSS terpisah

const VideoSection = () => {
  return (
    <section className="video-section">
      <h1> Laboratorium Inovasi</h1>
      <h2>Model Laboratorium dibagi ke dalam lima tahap yaitu Drum Up, 
        Diagnose, Design, Deliver, dan Display</h2>
      <div className="video-wrapper">
        {/* Video 1 */}
        <div className="video-item">
          <iframe
            width="500"
            height="300"
            src="https://youtube.com/embed/gJ0jAmLssjc"
            title="YouTube video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* Video 2 */}
        <div className="video-item">
          <iframe
            width="500"
            height="300"
            src="https://youtube.com/embed/QExvuVbnMwM"
            title="YouTube video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* Video 3 */}
        <div className="video-item">
          <iframe
            width="500"
            height="300"
            src="https://youtube.com/embed/n9JVaNiQ8Rg?t=4"
            title="YouTube video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* Video 4 */}
        <div className="video-item">
          <iframe
            width="500"
            height="300"
            src="https://youtube.com/embed/rei_mhPsCm0"
            title="YouTube video 4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
