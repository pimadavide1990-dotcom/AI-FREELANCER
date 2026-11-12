import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connessione al backend Node.js
const socket = io('http://localhost:5000');

export default function ChatPage({ roomId = 'room_123', currentUser = 'Freelancer' }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Entra nella stanza di chat
    socket.emit('join_room', roomId);

    // Carica i messaggi precedenti della stanza
    socket.on('load_messages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Ricevi i nuovi messaggi in tempo reale
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Pulizia dei listener alla chiusura del componente
    return () => {
      socket.off('load_messages');
      socket.off('receive_message');
    };
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit('send_message', {
      roomId,
      sender: currentUser,
      text,
    });

    setText('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>💬 Chat Sicura - Progetto</h2>
      
      {/* Box dei messaggi */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        height: '350px', 
        overflowY: 'scroll', 
        padding: '15px', 
        marginBottom: '15px', 
        background: '#fafafa' 
      }}>
        {messages.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center' }}>Nessun messaggio. Inizia la conversazione!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ marginBottom: '12px', background: '#fff', padding: '10px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: '#007bff' }}>{msg.sender}</strong>
                <span style={{ fontSize: '0.75em', color: '#888' }}>{msg.timestamp}</span>
              </div>
              <div style={{ color: msg.warning ? '#d9534f' : '#333' }}>
                {msg.text}
              </div>
              {msg.warning && (
                <div style={{ fontSize: '0.75em', color: '#d9534f', marginTop: '4px', fontWeight: 'bold' }}>
                  ⚠️ Avviso: Rilevato tentativo di scambio contatti esterni.
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input di invio */}
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrivi un messaggio (evita email o numeri di telefono)..."
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Invia
        </button>
      </form>
    </div>
  );
}