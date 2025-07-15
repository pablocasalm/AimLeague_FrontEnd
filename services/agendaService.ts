import { apiClient } from './apiClient';

export const agendaService = {
    getAgendaEvents: (userId?: number) => apiClient('/Agenda/GetAgendaEvents',{
        method: 'GET',
    }),

    deleteAgendaEvent: (eventId: any) => apiClient(`/Agenda/DeleteAgendaEvent?eventId=${eventId}`, {
        method: 'DELETE',
    }),

    modifyAgendaEvent: (eventData: any) => apiClient('/Agenda/ModifyAgendaEvent', {
        method: 'POST',
        body: JSON.stringify(eventData),
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