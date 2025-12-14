
import React, { useState, useEffect, useRef } from "react";

// Helper: turn URLs inside text into <a> tags
const renderTextWithLinks = (text) => {
  // Matches http:// or https:// followed by non-space chars
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(/^https?:\/\//)) {
      // Unique link style: Teal
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0d9488", textDecoration: "underline", fontWeight: 600 }}
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

  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ... (sendMessage and handleKeyDown functions remain the same)
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
  // ---

  // Unique Color Palette: Gradient Primary, Soft Gray/White, Accent Teal
  const primaryColorStart = "#6366f1"; // Indigo-500
  const primaryColorEnd = "#a855f7"; // Violet-500
  const userBubbleColor = "#4338ca"; // Dark Blue (for contrast)
  const botBubbleColor = "rgba(255, 255, 255, 0.9)"; // Semi-transparent White
  const borderColor = "rgba(255, 255, 255, 0.3)"; 

  return (
  <>
    {/* BOT ICON (bottom-left) */}
    {!isOpen && (
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          zIndex: 9999,
        }}
      >
        <span style={{ fontSize: 28 }}>🤖</span>
      </div>
    )}

    {/* CHAT WINDOW */}
    {isOpen && (
      <div
        style={{
          position: "fixed",
          right: 30,
          bottom: 30,
          width: 380,
          borderRadius: 24,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif",
          display: "flex",
          flexDirection: "column",
          zIndex: 9999,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: `linear-gradient(90deg, ${primaryColorStart}, ${primaryColorEnd})`,
            color: "white",
            padding: "16px 20px",
            fontWeight: 700,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
          }}
        >
          ✨ Cognito Assistant
          <button
            onClick={() => setIsOpen(false)}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* MESSAGES */}
        <div
          style={{
            padding: "16px 20px",
            maxHeight: 400,
            overflowY: "auto",
            fontSize: 14,
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: m.from === "user" ? "right" : "left",
                margin: "12px 0",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "12px 18px",
                  borderRadius: 25,
                  background:
                    m.from === "user" ? userBubbleColor : botBubbleColor,
                  color: m.from === "user" ? "white" : "#374151",
                  maxWidth: "80%",
                }}
              >
                {renderTextWithLinks(m.text)}
              </div>
            </div>
          ))}
          {loading && <div>Assistant is thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${borderColor}`,
            padding: 12,
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your query..."
            style={{
              flex: 1,
              borderRadius: 25,
              padding: "10px 16px",
              border: "1px solid #e5e7eb",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              marginLeft: 8,
              borderRadius: 25,
              width: 50,
              background: `linear-gradient(135deg, ${primaryColorStart}, ${primaryColorEnd})`,
              color: "white",
              border: "none",
            }}
          >
            ➔
          </button>
        </div>
      </div>
    )}
  </>
);

};

export default ChatBot;