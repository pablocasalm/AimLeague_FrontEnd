import React, { useState } from 'react';
import { teamService } from '../../services/teamService';
import { MessageSquare } from 'lucide-react';

export interface Notification {
  id: number;
  title: string;
  description: string;
  isRead: boolean;
  type: string;
  relatedId: number;
  createdAt: string;
}

const NotificationButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setOpen(v => !v);
    if (!open) loadNotifications();
  };

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Aquí el API realmente devuelve [{ id, title, description, readed, type, relatedEntityId, createdAt }, …]
      const raw = await teamService.getNotifications();
      // Lo normalizamos al shape que espera tu interfaz Notification
      const list: Notification[] = raw.map(n => ({
        id:           n.id,
        title:        n.title,
        description:  n.description,
        isRead:       n.readed,              
        type:         n.type,
        relatedId:    n.relatedEntityId,     
        createdAt:    n.createdAt,
      }));
      setNotes(list);
    } finally {
      setLoading(false);
    }
  };

  async function onAccept(id: number) {
        await teamService.acceptInvitation(id);
        setNotes(notes.map(n => n.id === id ? { ...n, isRead: true } : n));
    }

  const onReject = async (id: number) => {
    await teamService.rejectInvitation(id);
    setNotes(notes.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const onMarkRead = async (id: number) => {
    await teamService.markRead(id);
    setNotes(notes.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
      >
        <MessageSquare className="w-5 h-5" />
        {notes.some(n => !n.isRead) && (
          <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded shadow-lg max-h-96 overflow-auto z-50">
          {loading && <p className="p-4 text-gray-400">Cargando…</p>}
          {!loading && notes.length === 0 && <p className="p-4 text-gray-500">Sin notificaciones</p>}
          {!loading && notes.map(n => (
            <div
              key={n.id}
              className={`p-3 border-b border-gray-700 flex justify-between items-start ${
                n.isRead ? 'bg-gray-800' : 'bg-gray-900'
              }`}
            >
              <div className="flex-1">
                <p className="text-white font-semibold">{n.title}</p>
                <p className="text-gray-400 text-sm">{n.description}</p>
              </div>
              {!n.isRead && n.type === 'Invitation' && (
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => onAccept(n.id)}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => onReject(n.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => onMarkRead(n.id)}
                    className="text-gray-400 hover:text-gray-300 text-xs mt-1"
                  >
                    Marcar como leído
                  </button>
                </div>
              )}
              {!n.isRead && n.type !== 'Invitation' && (
                <button
                  onClick={() => onMarkRead(n.id)}
                  className="text-gray-400 hover:text-gray-300 text-xs ml-4"
                >
                  ✓
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;