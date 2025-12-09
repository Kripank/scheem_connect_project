// src/ChatBot.jsx
import React, { useState } from "react";

// Helper: turn URLs inside text into <a> tags
const renderTextWithLinks = (text) => {
  // Matches http:// or https:// followed by non-space chars
  const urlRegex = /(https?:\/\/[^\s)]+)/g;

  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      // It's a URL → make it clickable
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2563eb", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about this website." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    const userMsg = { from: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      let botText = "I could not generate a reply.";

      if (!res.ok) {
        botText = data.error || "Server error. Please try again.";
      } else if (data.reply) {
        botText = data.reply;
      }

      const botMsg = { from: "bot", text: botText };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error: could not contact the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        width: 320,
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        overflow: "hidden",
        fontFamily: "sans-serif",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#4f46e5",
          color: "white",
          padding: "8px 12px",
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        Site Assistant
      </div>

      <div
        style={{
          padding: 8,
          maxHeight: 280,
          overflowY: "auto",
          fontSize: 13,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "user" ? "right" : "left",
              margin: "4px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 8px",
                borderRadius: 8,
                background: m.from === "user" ? "#e0f2fe" : "#f3f4f6",
                maxWidth: "100%",
                textAlign: "left",
              }}
            >
              {renderTextWithLinks(m.text)}
            </div>
          </div>
        ))}
        {loading && <div>Bot is typing...</div>}
      </div>

      <div
        style={{
          display: "flex",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <input
          style={{
            flex: 1,
            border: "none",
            padding: "8px",
            fontSize: 13,
            outline: "none",
          }}
          placeholder="Ask about this site..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          style={{
            border: "none",
            padding: "0 12px",
            fontSize: 13,
            cursor: "pointer",
            background: "#4f46e5",
            color: "white",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
