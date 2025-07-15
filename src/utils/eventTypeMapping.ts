export type EventType = 'None' | 'Partido' | 'Entrenamiento' | 'Reunión' | 'Torneo' | 'Otro';

export const eventTypeLabels: Record<EventType, number> = {
  None: 0,
  Partido: 1,
  Entrenamiento: 2,
  Reunión: 3,
  Torneo: 4,
  Otro: 5,
};

export function getEventTypeLabel(eventType: string): number {
  if (eventType in eventTypeLabels) {
    return eventTypeLabels[eventType as EventType];
  }
  return 0; // Valor por defecto si no se encuentra el tipo
}