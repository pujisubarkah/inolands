import React, { useState } from 'react';

const ChatbotComponent = ({ closeChatbot }) => {
  const [messages, setMessages] = useState([
    { text: 'Pergi ke pasar beli rambutan, pulang-pulang bawa ikan patin. Selamat datang di Inolands, yuk ngobrol lanjutkan pesan! 😊', sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Fungsi untuk memilih respons chatbot berdasarkan input
  const getBotResponse = (message) => {
    if (message.includes('halo')) return 'Halo juga! Ada yang bisa Ino bantu? 😊';
    if (message.includes('pantun')) return 'Jalan-jalan ke Surabaya, jangan lupa beli oleh-oleh. Salam kenal dari Ino, teman setia ngobrol sehari-hari!';
    return 'Terima kasih atas pesan Anda!';
  };

  // Fungsi untuk mengirim pesan
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Tambah pesan pengguna
    setMessages([...messages, { text: inputMessage, sender: 'user' }]);

    // Buat respons dari chatbot
    const botResponse = getBotResponse(inputMessage.toLowerCase());

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, sender: 'bot' },
    ]);

    setInputMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-gray-100 rounded-lg shadow-lg overflow-hidden z-50">
      <div className="flex items-center justify-between bg-[#8B0000] text-white text-center font-bold py-3">
        <div className="flex items-center">
          <img
            src="/ino.png"
            alt="Chatbot Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>Bicara dengan Ino</span>
        </div>
        <button onClick={closeChatbot} className="text-white font-bold text-xl">
          &times;
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-3/4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`text-sm ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`bg-${message.sender === 'user' ? 'gray-300' : 'gray-200'} p-2 rounded-lg`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center p-2 border-t">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 p-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-[#8B0000]"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-[#8B0000] text-white rounded-md hover:bg-[#B22222]"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
