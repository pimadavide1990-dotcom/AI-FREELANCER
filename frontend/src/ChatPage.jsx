import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Send, ShieldAlert, MessageSquare } from 'lucide-react';

const socket = io('http://localhost:5000');

export default function ChatPage({ user }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const roomId = 'project_room_1';

  const currentSender = user ? user.name : 'Utente Guest';

  useEffect(() => {
    socket.emit('join_room', roomId);

    socket.on('load_messages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('load_messages');
      socket.off('receive_message');
    };
  }, [roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    socket.emit('send_message', {
      roomId,
      sender: currentSender,
      text: inputMessage
    });

    setInputMessage('');
  };

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
        {/* HEADER CHAT */}
        <div className="bg-slate-950 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Chat Progetto / Trattativa Direct</h2>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Connessione Sicura Criptata
              </span>
            </div>
          </div>
        </div>

        {/* CORPO MESSAGGI */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/40">
          {messages.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-20">Nessun messaggio inviato in questa stanza. Inizia la conversazione!</p>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender === currentSender;
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-500 mb-1 px-1">{msg.sender} • {msg.timestamp}</span>
                  <div className={`max-w-md px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    msg.warning 
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300' 
                      : isMe 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.warning && (
                      <div className="flex items-center gap-1 text-amber-400 font-bold mb-1">
                        <ShieldAlert className="w-4 h-4" /> Filtro di Sicurezza IA
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FORM INVIO MESSAGGIO */}
        <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Scrivi un messaggio sicuro..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all flex items-center gap-2">
            Invia
          </button>
        </form>
      </div>
    </div>
  );
}