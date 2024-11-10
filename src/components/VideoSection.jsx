import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; 
import './VideoSection.css'; 

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "PENGENALAN LAB INOVASI",
      views: 169,
      src: "https://youtube.com/embed/n9JVaNiQ8Rg",
      description: "Tahap membangun kesadaran kolektif untuk berinovasi.",
      quiz: {
        question: "Apakah yang menjadi tujuan dari drump up?",
        options: ["Menginspirasi", "Mengembangkan semangat", "Membentuk kemauan berinovasi", "Semua Benar"],
        correctAnswer: "Semua Benar",
      },
    },
    {
      id: 2,
      title: "DRUMP UP",
      views: 169,
      src: "https://youtube.com/embed/gJ0jAmLssjc",
      description: "Tahap membangun kesadaran kolektif untuk berinovasi.",
      quiz: {
        question: "Apakah yang menjadi tujuan dari drump up?",
        options: ["Menginspirasi", "Mengembangkan semangat", "Membentuk kemauan berinovasi", "Semua Benar"],
        correctAnswer: "Semua Benar",
      },
    },
    {
      id: 3,
      title: "DIAGNOSE",
      views: 169,
      src: "https://youtube.com/embed/QExvuVbnMwM",
      description: "Tahap membangun kesadaran kolektif untuk berinovasi.",
      quiz: {
        question: "Apakah yang menjadi tujuan dari drump up?",
        options: ["Menginspirasi", "Mengembangkan semangat", "Membentuk kemauan berinovasi", "Semua Benar"],
        correctAnswer: "Semua Benar",
      },
    },
    {
      id: 4,
      title: "DESAIN",
      views: 169,
      src: "https://youtube.com/embed/rei_mhPsCm0",
      description: "Tahap membangun kesadaran kolektif untuk berinovasi.",
      quiz: {
        question: "Apakah yang menjadi tujuan dari drump up?",
        options: ["Menginspirasi", "Mengembangkan semangat", "Membentuk kemauan berinovasi", "Semua Benar"],
        correctAnswer: "Semua Benar",
      },
    },
   {
      id: 5,
      title: "DISPLAY",
      views: 250,
      src: "https://youtube.com/embed/KArqARoQI5w",
      description: "Tingkatkan kemampuan public speaking Anda dengan teknik lanjutan.",
      quiz: {
        question: "Apa yang dimaksud dengan diagnose?",
        options: [
          "Identifikasi kesenjangan kondisi saat ini dengan seharusnya",
          "Fasilitasi dalam menemukan ide inovasi",
          "Menggali potensi yang dimiliki untuk mengembangkan",
          "Semua Benar"
        ],
        correctAnswer: "Semua Benar",
      },
    },
  ];

  const Quiz = ({ quiz, onQuizComplete }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmitted(true);
      if (selectedOption === quiz.correctAnswer) {
        onQuizComplete();
      }
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
          <button type="submit" disabled={!selectedOption}>Kirim</button>
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

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [completedQuizzes, setCompletedQuizzes] = useState(new Array(videos.length).fill(false));
  const [allQuizzesCompleted, setAllQuizzesCompleted] = useState(false);
  const [userName, setUserName] = useState('');

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('quizProgress'));
    if (savedProgress) {
      setCompletedQuizzes(savedProgress);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('quizProgress', JSON.stringify(completedQuizzes));
    if (completedQuizzes.every(completed => completed)) {
      setAllQuizzesCompleted(true);
    }
  }, [completedQuizzes]);

  const handleQuizComplete = (videoIndex) => {
    const newCompletedQuizzes = [...completedQuizzes];
    newCompletedQuizzes[videoIndex] = true;
    setCompletedQuizzes(newCompletedQuizzes);
  };

  const handleDownloadCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [600, 400], // Adjust the certificate size
    });

    const img = new Image();
    img.src = '/certificate_template.jpg';

    img.onload = () => {
      doc.addImage(img, 'JPEG', 0, 0, 600, 400); // Add the image as a background
  
    // Add text over the image
    doc.setFontSize(24);
    doc.setTextColor('#000');
    doc.text(`Sertifikat Kelulusan`, 400, 100, { align: 'center' });
    doc.setFontSize(18);
    doc.text(`Diberikan Kepada`, 400, 140, { align: 'center' });
    doc.text(`${userName}`, 400, 180, { align: 'center' });
    doc.text(`Telah Menyelesaikan Pembelajaran Laboratorium Inovasi 20JP`, 400, 200, { align: 'center' });
    doc.text('Tanggal: ' + new Date().toLocaleDateString(), 400, 260, { align: 'center' });
    doc.save(`Sertifikat-Kelulusan.pdf`);
  };
};

  return (
    <div className="container flex flex-col md:flex-row">
      <aside className="sidebar p-4 w-full md:w-1/3 bg-gray-100">
        <ul>
          {videos.map((video, index) => (
            <li 
              key={video.id} 
              onClick={() => setSelectedVideo(video)}
              className={`cursor-pointer mb-2 flex justify-between items-center ${completedQuizzes[index] ? 'text-green-600' : 'text-black'}`}
            >
              <span className="font-semibold">{video.title}</span>
              {/* Tampilkan bintang emas jika video selesai */}
              {completedQuizzes[index] && (
                <span role="img" aria-label="completed">⭐</span>
              )}
            </li>
          ))}
        </ul>
      </aside>
      
      <section className="video-section p-4 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-center mb-6">LABORATORIUM INOVASI</h1>
        <p className="text-lg text-gray-700 mb-4">Lembaga Administrasi Negara (LAN) pada tahun 2015 dan tahun 2016 telah menjalin kerjasama dengan beberapa pemerintah daerah untuk melakukan pendampingan, 
asistensi, dan fasilitasi inovasi melalui program yang disebut dengan Laboratorium Inovasi. </p>
       
        <div className="video-wrapper mb-4">
          <div className="video-item">
             <iframe
              width="100%"
              height="500"
              src={selectedVideo.src}
              title={selectedVideo.title}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-4"
            ></iframe>
            <div className="video-info mb-4">
              <p className="video-views text-gray-600">{selectedVideo.views} views</p>
              <p className="video-description">{selectedVideo.description}</p>
            </div>
            <Quiz 
              quiz={selectedVideo.quiz} 
              onQuizComplete={() => handleQuizComplete(selectedVideo.id - 1)} 
            />
          </div>
        </div>

        {allQuizzesCompleted && (
          <div className="certificate-section">
            <input 
              type="text" 
              placeholder="Masukkan Nama" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <button 
              onClick={handleDownloadCertificate} 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              disabled={!userName}
            >
              Unduh Sertifikat
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default VideoSection;
