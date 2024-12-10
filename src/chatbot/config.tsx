// chatbot/config.js
// config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: "InoBot",
  initialMessages: [
    createChatBotMessage("Jalan-jalan ke Kota Baru,Pulangnya beli mangga harum.Halo! Ada yang Ino bisa kubantu?"),
      ],
  
  customStyles: {
    botMessageBox: {
      backgroundColor: "#8B0000",
    },
    chatButton: {
      backgroundColor: "#8B0000", // Dark red
    },
  },

  customComponents: {
    botAvatar: () => <img src="/ino.png" alt="Bot Avatar" className="w-8 h-8 rounded-full" />,
    // userAvatar not set, defaults will apply for user
  }
};

export default config;
