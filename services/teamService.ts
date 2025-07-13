import { apiClient } from './apiClient';

export const teamService = {
    
    getTeamInfo: (teamId: any) => apiClient('Team/GetTeamInfo', {
        method: 'GET',
    }),

    createTeam: (teamData: { TeamName: string, TeamRole: Number, ImageUrl?: string}) => apiClient('/Team/CreateTeam' , {
        method: 'POST',
        body: JSON.stringify(teamData),
    }),

    joinTeam: (joinTeamData: any) => apiClient('Team/JoinTeam', {
        method: 'POST',
        body: JSON.stringify(joinTeamData),
    }),

    removeMember: (removeMemberData: any) => apiClient('Team/removeMember', {
        method: 'DELETE',
        body: JSON.stringify(removeMemberData),
    }), 

    
}