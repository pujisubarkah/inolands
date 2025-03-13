import React, { useState, useEffect, useRef, useCallback } from "react";
import { Message } from "./types";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createChatBotMessage = (text: string): Message => ({
    id: String(Date.now()),
    text,
    sender: "inobot",
  });

  // **🔹 Fungsi untuk mengirim permintaan ke OpenRouter**
  const fetchResponseFromAPI = async (userInput: string) => {
    setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://inoland.lan.go.id", 
          "X-Title": "Inobot AI",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages: [
            { role: "system", content: "Anda adalah Inobot, asisten AI yang membantu pertanyaan tentang administrasi publik." },
            { role: "user", content: userInput },
          ],
        }),
      });

      const data = await response.json();
      const botMessage = data?.choices?.[0]?.message?.content || "Maaf, saya tidak dapat menemukan jawaban.";
      
      setMessages((prev) => [...prev, createChatBotMessage(botMessage)]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, createChatBotMessage("Maaf, terjadi kesalahan. Coba lagi nanti.")]);
    }
    setLoading(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: String(Date.now()), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 🔹 Kirim ke API setelah user mengirim pesan
    fetchResponseFromAPI(input);
  };

  const sendGreeting = useCallback(() => {
    setMessages((prev) => [...prev, createChatBotMessage("👋 Hello Sobat Ino! Ada yang bisa saya bantu?")]);
  }, []);

  useEffect(() => {
    if (isOpen) sendGreeting();
  }, [isOpen, sendGreeting]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="p-0 border-none bg-transparent focus:outline-none">
        <img src="/ino.png" alt="Chatbot Icon" width={48} height={48} />
      </button>

      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-96 border border-gray-300 flex flex-col">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Inobot</h2>
            <button onClick={() => setIsOpen(false)} className="text-red-500 font-bold hover:text-red-700">✕</button>
          </div>

          <div className="flex-grow overflow-y-auto p-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-2 rounded ${msg.sender === "user" ? "text-right text-blue-500" : "text-left text-gray-700"}`}>
                <img src={msg.sender === "user" ? "/user.png" : "/ino.png"} alt="Icon" width={12} height={12} className="inline-block mr-2" />
                <strong>{msg.sender === "user" ? "User" : "InoBot"}:</strong> {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-500 text-sm">Inobot sedang mengetik...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ketik pesan..."
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
