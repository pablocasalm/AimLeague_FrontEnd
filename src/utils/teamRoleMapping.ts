// src/utils/teamRoleMapping.ts

/**
 * Roles que vienen de la API.
 */
export type RawRole = 'None' | 'Capitan' | 'Coach';

/**
 * Mapeo de RawRole → etiqueta de usuario.
 */
const rawToDisplayMap: Record<RawRole, string> = {
  None:    'Jugador',
  Capitan: 'Capitán',
  Coach:   'Coach'
};

/**
 * Dada una cadena de rol crudo, devuelve la etiqueta en español.
 * Si no existe en el mapeo, devuelve el mismo valor de entrada.
 */
export function mapRole(raw: string): string {
  return (rawToDisplayMap as Record<string,string>)[raw] || raw;
}
