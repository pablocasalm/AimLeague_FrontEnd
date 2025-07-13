import { apiClient } from './apiClient';

export const teamService = {
    
    getTeamInfo: (teamId: any) => apiClient(`/Team/GetTeamInfo?teamId=${teamId}`, {
        method: 'GET',

    }),

    createTeam: (teamData: { TeamName: string, TeamRole: Number, ImageUrl?: string}) => apiClient('/Team/CreateTeam' , {
        method: 'POST',
        body: JSON.stringify(teamData),
    }),

    invitePlayer: (joinTeamData: any) => apiClient('Team/InvitePlayer', {
        method: 'POST',
        body: JSON.stringify(joinTeamData),
    }),

    removeMember: (removeMemberData: {
        TeamId: number,
        UserId: number
    }) => apiClient('Team/removeMember', {
        method: 'DELETE',
        body: JSON.stringify(removeMemberData),
    }), 

    getNotifications: (): Promise<{
        id: number;
        title: string;
        description: string;
        readed: boolean;        //Probablemente failed to fetch
        type: string;
        relatedEntityId: number;
        createdAt: string;
      }[]> =>
        apiClient('/Notifications', { method: 'GET' }),
    
      markRead: (notificationId: number) =>
        apiClient('/Notifications/MarkRead', {
          method: 'POST',
          body: JSON.stringify(notificationId)
        }),
    
      acceptInvitation: (notificationId: number) =>
        apiClient('/Notifications/AcceptInvitation', {
          method: 'POST',
          body: JSON.stringify(notificationId)
        }),
    
      rejectInvitation: (notificationId: number) =>
        apiClient('/Notifications/RejectInvitation', {
          method: 'POST',
          body: JSON.stringify(notificationId)
        }),
    
}