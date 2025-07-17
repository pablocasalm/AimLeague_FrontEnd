import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { Check, User as UserIcon, Search as SearchIcon,  ArrowLeft } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { User, userService, UserRole } from '../../services/userService'; 
import { getRoleNumber } from '../utils/roleMapping';


// Según tu service, User tiene: id, username, firstName, lastName, role
type Role = 'Administrador'|'Entrenador'|'Jugador'|'Usuario';
const availableRoles: Role[] = ['Administrador','Entrenador','Jugador','Usuario'];

const AdminRolesPage: React.FC = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<UserRole[]>([]);
  const [editing, setEditing] = useState<Record<string, Role>>({});
  const [savingId, setSavingId] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!term.trim()) return;
    setLoading(true);
    try {
      const users = await userService.searchUsersWithRole(term);
      setResults(users);
      setEditing({});
    } catch (err) {
      console.error('Error buscando usuarios:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (userId: number, newRole: Role) => {
    setEditing(prev => ({ ...prev, [userId]: newRole }));
  };

  const saveUser = async (user: UserRole) => {
    const newRole = editing[user.id];
    if (!newRole || newRole === user.right) return;
    setSavingId(user.id);
    try {
      const response = await userService.updateUserRole(user.id, getRoleNumber(newRole));
      if (response.success){
        console.log(response.message);
      }
    } catch (err) {
      console.error('Error guardando rol:', err);
      alert('No se pudo actualizar el rol');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-12">
{/* Cabecera con título y Volver */}
<div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
    <UserIcon className="w-8 h-8 text-cyan-400" />
    <span>Gestión de Roles</span>
  </h1>

  <RouterLink
    to="/dashboard"
    className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>Volver a Dashboard</span>
  </RouterLink>
</div>


        {/* Buscador */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={term}
            onChange={e => setTerm(e.target.value)}
            className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-r-lg flex items-center"
          >
            <SearchIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Resultados */}
        {loading ? (
          <p className="text-gray-400">Buscando…</p>
        ) : results.length === 0 ? (
          <p className="text-gray-400">Introduce un término y pulsa Buscar.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-800 border border-gray-700 rounded-lg">
            <table className="min-w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-gray-300">Usuario</th>
                  <th className="px-6 py-3 text-gray-300">Nombre</th>
                  <th className="px-6 py-3 text-gray-300">Rol Actual</th>
                  <th className="px-6 py-3 text-gray-300">Nuevo Rol</th>
                  <th className="px-6 py-3 text-gray-300 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {results.map(user => {
                  const editedRole = (editing[user.id] as Role) ?? user.right;
                  const isDirty = editedRole !== user.right;
                  return (
                    <tr key={user.id} className="border-t border-gray-700">
                      <td className="px-6 py-4 text-white">{user.username}</td>
                      <td className="px-6 py-4 text-gray-300">{user.firstName}</td>
                      <td className="px-6 py-4 text-gray-300">{user.right}</td>
                      <td className="px-6 py-4">
                        <select
                          value={editedRole}
                          onChange={e => handleRoleChange(user.id, e.target.value as Role)}
                          className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          {availableRoles.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => saveUser(user)}
                          disabled={!isDirty || savingId === user.id}
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300
                            ${isDirty 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'}
                          `}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {savingId === user.id ? 'Guardando…' : 'Guardar'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRolesPage;
