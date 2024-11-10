// chatbot/MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (message.includes("hello")) {
      this.actionProvider.handleHello();
    }
    if (message.includes("help")) {
      this.actionProvider.handleHelp();
    }
  }
}

export default MessageParser;
