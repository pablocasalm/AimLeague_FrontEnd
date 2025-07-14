import React, { useState } from 'react';
import { teamService } from '../../services/teamService';
import { MessageSquare, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const toggle = () => {
    setOpen(v => !v);
    if (!open) loadNotifications();
  };

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const raw = await teamService.getNotifications();
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

  const onAccept = async (id: number) => {
    await teamService.acceptInvitation(id);
    setNotes(notes.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

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
      {/* Botón de campana */}
      <button
        onClick={toggle}
        className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
      >
        <MessageSquare className="w-5 h-5" />
        {notes.some(n => !n.isRead) && (
          <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/* Panel de notificaciones */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded shadow-lg max-h-96 overflow-auto z-50">
          {loading && <p className="p-4 text-gray-400">Cargando…</p>}
          {!loading && notes.length === 0 && (
            <p className="p-4 text-gray-500">Sin notificaciones</p>
          )}
          {!loading && notes.map(n => (
            <div
              key={n.id}
              className={`relative p-3 border-b border-gray-700 flex justify-between items-center ${
                n.isRead ? 'bg-gray-800' : 'bg-gray-900'
              }`}
            >
              {/* “X” marcar como leído */}
              <button
                onClick={() => onMarkRead(n.id)}
                className="absolute top-2 left-2 p-1 hover:bg-gray-700 rounded transition-colors"
                title="Marcar como leído"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>

              {/* Contenido */}
              <div className="ml-6 flex-1">
                <p className="text-white font-semibold">{n.title}</p>
                <p className="text-gray-400 text-sm">{n.description}</p>
              </div>

              {/* Botones de acción */}
              {!n.isRead && n.type === 'Invitation' && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onAccept(n.id)}
                    className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center transition-colors opacity-80 hover:opacity-100"
                    title="Aceptar invitación"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => onReject(n.id)}
                    className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center transition-colors opacity-80 hover:opacity-100"
                    title="Rechazar invitación"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
