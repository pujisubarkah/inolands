import React, { useState } from 'react';
import './VideoSection.css'; // Pastikan untuk menambahkan styling

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "Drump UP",
      views: 169,
      src: "https://youtube.com/embed/gJ0jAmLssjc",
      description: "Tahap membantung kesadaran kolektif untuk berinovasi.",
      quiz: {
        question: "Apakah yang menjadi tujuan dari drump up",
        options: ["Menginspirasi", "mengembangkan semangat", "memebentuk kemauan berinovasi", "Semua Benar"],
        correctAnswer: "Semua Benar",
      },
    },
    {
      id: 2,
      title: "Diagnose",
      views: 250,
      src: "https://youtube.com/embed/QExvuVbnMwM",
      description: "Tingkatkan kemampuan public speaking Anda dengan teknik lanjutan.",
      quiz: {
        question: "Apa yang dimaksud dengan diagnose",
        options: ["identifikasi kesenjangan kondisi saat ini dengan seharusnya", "fasilitasi dalam menemukan ide inovasi", "mengali potensi yang dimiliki untuk mengembangkan", "Semua Benar"],
        correctAnswer: "Semua Benar",
      },
    },
    // Tambahkan video dan kuis lainnya di sini...
  ];

  const Quiz = ({ quiz }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmitted(true);
    };

    return (
      <div className="quiz-section">
        <h3>{quiz.question}</h3>
        <form onSubmit={handleSubmit}>
          {quiz.options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            </div>
          ))}
          <button type="submit">Kirim</button>
        </form>
        {isSubmitted && (
          <div className="quiz-result">
            {selectedOption === quiz.correctAnswer ? (
              <p>Jawaban Anda Benar!</p>
            ) : (
              <p>Jawaban Anda Salah. Jawaban yang benar adalah: {quiz.correctAnswer}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="video-section">
     <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0' }}>
      LABORATORIUM INOVASI
    </h1>
    <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1,5rem', textAlign: 'justify', margin: '20px 0' }}> Model Laboratorium Inovasi  memiliki 5 tahapan atau yang dikenal dengan istilah 5D. 
      Tahap pertama adalah Drum Up yang digunakan untuk membangkitkan semangat untuk ber-inovasi. 
      Tahap kedua adalah Diagnose sebagai kegiatan mengidentifikasi potensi dan kemudian memunculkan ide inovasi. 
      Tahap selanjutnya adalah Design yang akan mengupas tentang bagaimana mendesain sebuah inovasi sampai dengan rencana aksi yang akan dilakukan. 
      Masuk tahap keempat ada Delivery yang diisi dengan pemantauan rencana aksi inovasi yang dilakukan. Tahap kelima adalah Display untuk memamerkan 
      hasil inovasi yang dilakukan oleh pemerintah daerah, biasanya dikemas dalam sebuah acara bertajuk Gelar Karya Inovasi.</h2>
      <div className="video-wrapper">
        {videos.map(video => (
          <div className="video-item" key={video.id}>
            <h2>{video.title}</h2>
          <p>{video.subtitle}</p>
            <iframe
              width="500"
              height="300"
              src={video.src}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="video-info">
              <p className="video-views">{video.views} views</p>
              <p className="video-description">{video.description}</p>
            </div>
            <Quiz quiz={video.quiz} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
