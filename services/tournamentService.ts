import { apiClient } from "./apiClient";

export const tournamentService = {

    createTournament: (tournamentData: any) => apiClient('/Tournament/CreateTournament', {
        method: 'POST',
        body: JSON.stringify(tournamentData),
    }),

    getAllTournaments: () => apiClient('/Tournament/GetAllTournaments', {
        method: 'GET',
    }),

    getTournamentById: (tournamentid: any) => apiClient('/Tournament/GetTournamentById', {
        method: 'GET',
        body: JSON.stringify(tournamentid),
    }),

    getNextTournaments: () => apiClient('/Tournament/GetNextTournaments', {
        method: 'GET',
    }),

    modifyTournament: (payload: any) => apiClient('/Tournament/ModifyTournament', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    deleteTournament: (tournamentId: number) => apiClient(`/Tournament/deleteTournament?tournamentId=${tournamentId}`, {
        method: 'DELETE',
    }),
}