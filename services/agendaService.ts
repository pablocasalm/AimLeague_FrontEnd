import { apiClient } from './apiClient';

export const agendaService = {
    getAgendaEvents: () => apiClient('/Agenda/GetAgendaEvents',{
        method: 'GET',
    }),

    deleteAgendaEvent: (eventId: any) => apiClient(`/Agenda/DeleteAgendaEvent?eventId=${eventId}`, {
        method: 'DELETE',
    }),

    modifyAgendaEvent: (payload: any) => apiClient('/Agenda/ModifyAgendaEvent', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    createAgendaEvent: (eventData: any) => apiClient('/Agenda/CreateAgendaEvent', {
        method: 'POST',
        body: JSON.stringify(eventData),
    }),

    getAgendaEventByUserId: () => apiClient('/Agenda/GetAgendaEventByUserId', {
        method: 'GET',
    }),

    getEventById: (id: any) => apiClient(`/Agenda/GetEventById?eventId=${id}`, {
        method: 'GET',
    })
    
}