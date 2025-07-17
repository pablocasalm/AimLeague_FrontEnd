// src/pages/AdminTournamentsPage.tsx

import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  PlusCircle,
  Edit3,
  Trash2,
  ArrowLeft,
  Calendar as CalendarIcon,
  X as CloseIcon,
  CheckCircle
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import { tournamentService } from '../../services/tournamentService';

// Payload que envías al crear un torneo (sin id)
interface CreateTournamentPayload {
  name: string;
  description: string;
  startDate: string;   // ISO local "YYYY-MM-DDTHH:mm"
  endDate: string;     // ISO local
  price: number;
  maxTeams: number;
  prize: number;
}

// DTO que devuelve el back (incluye id)
interface TournamentDTO {
  id: number;
  name: string;
  description: string;
  startDate: string;   // ISO UTC o local
  endDate: string;
  price: number;
  maxTeams: number;
  prize: number;
}

const AdminTournamentsPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Control modal + estado de edición
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TournamentDTO | null>(null);

  // Form: siempre con todos los campos necesarios
  const [form, setForm] = useState<CreateTournamentPayload>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    price: 0,
    maxTeams: 0,
    prize: 0
  });
  const [saving, setSaving] = useState(false);

  // 1) Carga inicial de torneos
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const list = await tournamentService.getAllTournaments();
        setTournaments(list);
      } catch (err) {
        console.error('Error cargando torneos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // 2) Abrir modal CREAR
  const openCreate = () => {
    setEditing(null);
    setForm({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      price: 0,
      maxTeams: 0,
      prize: 0
    });
    setModalOpen(true);
  };

  // 3) Abrir modal EDITAR
  const openEdit = (t: TournamentDTO) => {
    setEditing(t);
    setForm({
      name: t.name,
      description: t.description,
      startDate: t.startDate.slice(0, 16),
      endDate: t.endDate.slice(0, 16),
      price: t.price,
      maxTeams: t.maxTeams,
      prize: t.prize
    });
    setModalOpen(true);
  };

  // 4) Guardar (CREAR vs ACTUALIZAR)
  const handleSave = async () => {
    // validación mínima
    if (!form.name || !form.startDate || !form.endDate) {
      alert('Nombre, fecha inicio y fecha fin son obligatorios');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        // → payload de edición: reutilizamos CreateTournamentPayload
        const payload: TournamentDTO = { id: editing.id , 
            name: form.name,
            description: form.description,
            startDate: form.startDate,
            endDate: form.endDate,
            price: form.price,
            maxTeams: form.maxTeams,
            prize: form.prize
        };
        
        const updated = await tournamentService.modifyTournament(payload);
        setTournaments(ts => ts.map(t => t.id === editing.id ? updated : t));
      } else {
        // → payload de creación
        const payload: CreateTournamentPayload = { ...form };
        const created = await tournamentService.createTournament(payload);
        setTournaments(ts => [created, ...ts]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Error guardando torneo:', err);
      alert('No se pudo guardar el torneo');
    } finally {
      setSaving(false);
    }
  };

  // 5) Eliminar
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar este torneo?')) return;
    try {
      await tournamentService.deleteTournament(id);
      setTournaments(ts => ts.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error eliminando torneo:', err);
      alert('No se pudo eliminar el torneo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <CalendarIcon className="w-8 h-8 text-cyan-400" />
            <span>Administración de Torneos</span>
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={openCreate}
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Crear Torneo
            </button>
            <RouterLink
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al Dashboard</span>
            </RouterLink>
          </div>
        </div>

        {/* Lista */}
        {loading ? (
          <p className="text-gray-400">Cargando torneos…</p>
        ) : tournaments.length === 0 ? (
          <p className="text-gray-400">No hay torneos. ¡Crea uno!</p>
        ) : (
          <div className="overflow-x-auto bg-gray-800 border border-gray-700 rounded-lg">
            <table className="min-w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-gray-300">Título</th>
                  <th className="px-6 py-3 text-gray-300">Descripción</th>
                  <th className="px-6 py-3 text-gray-300">Inicio</th>
                  <th className="px-6 py-3 text-gray-300">Fin</th>
                  <th className="px-6 py-3 text-gray-300">Precio</th>
                  <th className="px-6 py-3 text-gray-300">Máx. Equipos</th>
                  <th className="px-6 py-3 text-gray-300">Premio</th>
                  <th className="px-6 py-3 text-gray-300 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map(t => (
                  <tr key={t.id} className="border-t border-gray-700 hover:bg-gray-700">
                    <td className="px-6 py-4 text-white">{t.name}</td>
                    <td className="px-6 py-4 text-gray-300">{t.description}</td>
                    <td className="px-6 py-4 text-gray-300">{new Date(t.startDate).toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-300">{new Date(t.endDate).toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-300">${t.price}</td>
                    <td className="px-6 py-4 text-gray-300">{t.maxTeams}</td>
                    <td className="px-6 py-4 text-gray-300">${t.prize}</td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id!)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => !saving && setModalOpen(false)}
            />
            <div className="relative bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 z-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  {editing ? 'Editar Torneo' : 'Crear Torneo'}
                </h2>
                <button
                  onClick={() => !saving && setModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Formulario completo */}
              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="text-gray-300 block mb-1">Título *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                {/* Descripción */}
                <div>
                  <label className="text-gray-300 block mb-1">Descripción</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  />
                </div>
                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 block mb-1">Inicio *</label>
                    <input
                      type="datetime-local"
                      value={form.startDate}
                      onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Fin *</label>
                    <input
                      type="datetime-local"
                      value={form.endDate}
                      onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                {/* Precio, Máximo y Premio */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-gray-300 block mb-1">Precio</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Máx. Equipos</label>
                    <input
                      type="number"
                      value={form.maxTeams}
                      onChange={e => setForm(f => ({ ...f, maxTeams: Number(e.target.value) }))}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Premio</label>
                    <input
                      type="number"
                      value={form.prize}
                      onChange={e => setForm(f => ({ ...f, prize: Number(e.target.value) }))}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg flex items-center space-x-2"
                >
                  {saving ? (
                    <span>Guardando…</span>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Guardar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTournamentsPage;

