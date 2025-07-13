// src/utils/roleMapping.ts

/**
 * Los posibles valores que devuelve tu API en el campo "Role"
 */
export type UserRole = 'None' | 'Usuario' | 'Player' | 'Coach' | 'Admin';

/**
 * Mapeo de cada valor crudo a su etiqueta en español
 */
export const roleLabels: Record<UserRole, string> = {
  None:    'Básico',
  Usuario: 'Usuario',
  Player:  'Jugador',
  Coach:   'Entrenador',
  Admin:   'Administrador',
};

/**
 * Función de ayuda para obtener la etiqueta a partir del valor crudo.
 * Si recibe algo que no conoce, devuelve el valor tal cual.
 */
export function getRoleLabel(role: string): string {
  if (role in roleLabels) {
    return roleLabels[role as UserRole];
  }
  return role;
}