import React, { useState, useEffect } from 'react';
import { User, userService } from '../../services/userService';
import { teamService } from '../../services/teamService';
import { AlertCircle, X } from 'lucide-react';
import { getNumber } from '../utils/storageNumber';

interface InvitePlayerModalProps {
  isOpen: boolean;
  teamId: number;
  onClose: () => void;
  onInviteSuccess: (user: User) => void;
}

const InvitePlayerModal: React.FC<InvitePlayerModalProps> = ({
  isOpen,
  teamId,
  onClose,
  onInviteSuccess
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Búsqueda con debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const handle = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const users = await userService.searchUsers(query);
        setResults(users);
      } catch {
        setResults([]);
      } finally {
        setLoadingSearch(false);
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [query]);

  const handleInvite = async () => {
    if (!selected) return;
    setInviting(true);
    setError(null);
    try {
      teamId = getNumber('teamid') || teamId; // Asegurarse de que teamId esté definido
      await teamService.invitePlayer({ TeamId: teamId, UserId: selected.id });
      onInviteSuccess(selected);
      onClose();
    } catch (e: any) {
      setError(e.message || 'Error invitando al jugador');
    } finally {
      setInviting(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Invitar Jugador</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </button>
        </div>
        {/* Search input */}
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-3"
        />
        {/* Results */}
        <div className="max-h-48 overflow-auto mb-4">
          {loadingSearch && <p className="text-gray-400">Buscando…</p>}
          {!loadingSearch && results.length === 0 && query.trim() !== '' && (
            <p className="text-gray-500">No se encontraron usuarios.</p>
          )}
          {results.map(user => (
            <div
              key={user.id}
              onClick={() => setSelected(user)}
              className={`flex items-center p-2 rounded cursor-pointer mb-1 ${
                selected?.id === user.id
                  ? 'bg-cyan-500/20 border border-cyan-500'
                  : 'hover:bg-gray-700'
              }`}
            >
              {user.photoUrl
                ? <img
                    src={user.photoUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                : <div className="w-8 h-8 rounded-full bg-gray-600 mr-3 flex items-center justify-center text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
              }
              <span className="text-white">{user.username}</span>
            </div>
          ))}
        </div>
        {/* Error */}
        {error && (
          <div className="flex items-center space-x-2 mb-2 text-red-400 text-sm">
            <AlertCircle /> <span>{error}</span>
          </div>
        )}
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            disabled={inviting}
          >
            Cancelar
          </button>
          <button
            onClick={handleInvite}
            disabled={!selected || inviting}
            className={`px-4 py-2 rounded font-semibold flex items-center space-x-2 ${
              selected
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
          >
            <span>{inviting ? 'Invitando…' : 'Invitar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitePlayerModal;