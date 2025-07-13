import { apiClient } from './apiClient';

export const agendaService = {
    getAgendaEvents: (teamId: any) => apiClient('Agenda/GetAgendaEvents',{
        method: 'GET',
    }),

    deleteAgendaEvent: (eventId: any) => apiClient('Agenda/DeleteAgendaEvent', {
        method: 'DELETE',
    }),

    modifyAgendaEvent: (eventData: any) => apiClient('Agenda/ModifyAgendaEvent', {
        method: 'POST',
        body: JSON.stringify(eventData),
    }),

    createAgendaEvent: (eventData: any) => apiClient('Agenda/CreateAgendaEvent', {
        method: 'POST',
        body: JSON.stringify(eventData),
    })
    
}