import React, { useState } from 'react';
import './VideoSection.css'; // Pastikan untuk menambahkan styling

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "Pengantar Public Speaking",
      views: 169,
      src: "https://youtube.com/embed/gJ0jAmLssjc",
      description: "Pelajari dasar-dasar public speaking dalam video ini.",
      quiz: {
        question: "Apa yang menjadi kunci sukses dalam public speaking?",
        options: ["Persiapan", "Kepercayaan Diri", "Materi", "Semua Benar"],
        correctAnswer: "Semua Benar",
      },
    },
    {
      id: 2,
      title: "Public Speaking Lanjutan",
      views: 250,
      src: "https://youtube.com/embed/QExvuVbnMwM",
      description: "Tingkatkan kemampuan public speaking Anda dengan teknik lanjutan.",
      quiz: {
        question: "Apa teknik yang sering digunakan dalam public speaking?",
        options: ["Storytelling", "Debate", "Dialogue", "Semua Benar"],
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
      <h1>Laboaratorium Inovasi</h1>
      <div className="video-wrapper">
        {videos.map(video => (
          <div className="video-item" key={video.id}>
            <h2>{video.title}</h2>
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
