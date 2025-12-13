// // src/ChatBot.jsx
// import React, { useState } from "react";

// // Helper: turn URLs inside text into <a> tags
// const renderTextWithLinks = (text) => {
//   // Matches http:// or https:// followed by non-space chars
//   const urlRegex = /(https?:\/\/[^\s)]+)/g;

//   const parts = text.split(urlRegex);

//   return parts.map((part, index) => {
//     if (urlRegex.test(part)) {
//       // It's a URL → make it clickable
//       return (
//         <a
//           key={index}
//           href={part}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "#2563eb", textDecoration: "underline" }}
//         >
//           {part}
//         </a>
//       );
//     }
//     return <span key={index}>{part}</span>;
//   });
// };

// const ChatBot = () => {
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hi! Ask me anything about this website." },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userText = input.trim();
//     setInput("");

//     const userMsg = { from: "user", text: userText };
//     setMessages((prev) => [...prev, userMsg]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userText }),
//       });

//       const data = await res.json();

//       let botText = "I could not generate a reply.";

//       if (!res.ok) {
//         botText = data.error || "Server error. Please try again.";
//       } else if (data.reply) {
//         botText = data.reply;
//       }

//       const botMsg = { from: "bot", text: botText };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Error: could not contact the server." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         right: 20,
//         bottom: 20,
//         width: 320,
//         borderRadius: 12,
//         boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
//         overflow: "hidden",
//         fontFamily: "sans-serif",
//         backgroundColor: "white",
//         display: "flex",
//         flexDirection: "column",
//         zIndex: 9999,
//       }}
//     >
//       <div
//         style={{
//           background: "#4f46e5",
//           color: "white",
//           padding: "8px 12px",
//           fontWeight: "bold",
//           fontSize: 14,
//         }}
//       >
//         Site Assistant
//       </div>

//       <div
//         style={{
//           padding: 8,
//           maxHeight: 280,
//           overflowY: "auto",
//           fontSize: 13,
//         }}
//       >
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               textAlign: m.from === "user" ? "right" : "left",
//               margin: "4px 0",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-block",
//                 padding: "6px 8px",
//                 borderRadius: 8,
//                 background: m.from === "user" ? "#e0f2fe" : "#f3f4f6",
//                 maxWidth: "100%",
//                 textAlign: "left",
//               }}
//             >
//               {renderTextWithLinks(m.text)}
//             </div>
//           </div>
//         ))}
//         {loading && <div>Bot is typing...</div>}
//       </div>

//       <div
//         style={{
//           display: "flex",
//           borderTop: "1px solid #e5e7eb",
//         }}
//       >
//         <input
//           style={{
//             flex: 1,
//             border: "none",
//             padding: "8px",
//             fontSize: 13,
//             outline: "none",
//           }}
//           placeholder="Ask about this site..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             border: "none",
//             padding: "0 12px",
//             fontSize: 13,
//             cursor: "pointer",
//             background: "#4f46e5",
//             color: "white",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
// src/ChatBot.jsx (Updated with Unique 'Floating Orb' Design)
// src/ChatBot.jsx (Updated with Unique 'Floating Orb' Design)
import React, { useState } from "react";

// Helper: turn URLs inside text into <a> tags
const renderTextWithLinks = (text) => {
  // Matches http:// or https:// followed by non-space chars
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
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
    <div
      style={{
        position: "fixed",
        right: 30, 
        bottom: 30,
        width: 380, // Wider for the unique look
        borderRadius: 24, // High radius for unique shape
        // Floating/Frosted Glass look using a deep shadow and semi-transparent background
        background: 'rgba(255, 255, 255, 0.95)', 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)", 
        // Note: For true Frosted Glass, you'd need a CSS class using backdrop-filter: blur()
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif", // A unique font choice (if available)
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      {/* HEADER SECTION - GRADIENT */}
      <div
        style={{
          background: `linear-gradient(90deg, ${primaryColorStart}, ${primaryColorEnd})`,
          color: "white",
          padding: "16px 20px", // Increased padding
          fontWeight: 700, // Extra-bold
          fontSize: 18,
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: 10, fontSize: 20 }}>✨</span>
        <span style={{ letterSpacing: '0.5px' }}>Cognito Assistant</span>
      </div>

      {/* MESSAGES CONTAINER */}
      <div
        style={{
          padding: "16px 20px",
          maxHeight: 400, // Taller window
          overflowY: "auto",
          fontSize: 14,
          // Hide scrollbar but allow scrolling
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "user" ? "right" : "left",
              margin: "12px 0", // More space
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "12px 18px",
                // Super high radius for "pill" shape
                borderRadius: 25, 
                // Color contrast: White text on dark primary color for user
                background: m.from === "user" ? userBubbleColor : botBubbleColor,
                color: m.from === "user" ? "white" : "#374151",
                maxWidth: "80%",
                textAlign: "left",
                lineHeight: 1.5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              }}
            >
              {renderTextWithLinks(m.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ margin: "12px 0", color: "#6b7280" }}>
            <span role="img" aria-label="typing">...</span> Assistant is thinking
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div
        style={{
          display: "flex",
          borderTop: `1px solid ${borderColor}`,
          padding: 12,
        }}
      >
        <input
          style={{
            flex: 1,
            // Full pill shape for input
            border: `1px solid #e5e7eb`, 
            borderRadius: 25, 
            padding: "10px 16px",
            fontSize: 14,
            outline: "none",
            marginRight: 10,
            backgroundColor: 'white',
          }}
          placeholder="Type your query here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            border: "none",
            borderRadius: 25,
            width: 50,
            height: 50,
            flexShrink: 0,
            cursor: "pointer",
            background: `linear-gradient(135deg, ${primaryColorStart}, ${primaryColorEnd})`,
            color: "white",
            transition: "all 0.3s",
            boxShadow: "0 4px 10px rgba(79, 70, 229, 0.4)",
            opacity: loading || !input.trim() ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Unique send icon (use a simple arrow for universal rendering) */}
          <span style={{ fontSize: 18, transform: 'rotate(-45deg)', marginTop: -2 }}>
            ➔
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;