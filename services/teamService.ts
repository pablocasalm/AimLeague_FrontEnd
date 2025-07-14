import { apiClient } from './apiClient';

export enum TeamRoleEnum {
  None = 0,
  Capitan = 1,
  Entrenador = 2
}

export const teamService = {
    
    getTeamInfo: (teamId: number) => apiClient(`/Team/GetTeamInfo?teamId=${teamId}`, {
        method: 'GET',

    }),

    createTeam: (teamData: { TeamName: string, TeamRole: Number, ImageUrl?: string}) => apiClient('/Team/CreateTeam' , {
        method: 'POST',
        body: JSON.stringify(teamData),
    }),

    invitePlayer: (inviteTeamData: {
        TeamId: number,
        UserId: number
    }) => apiClient('/Team/InvitePlayer', {
        method: 'POST',
        body: JSON.stringify(inviteTeamData),
    }),

    removeMember: (removeMemberData: {
        TeamId: number,
        UserId: number
    }) => apiClient('/Team/removeMember', {
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
        apiClient('/Notifications/GetUnreadNotifications', { method: 'GET' }),
    
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

          exitTeam: (data: {
            UserId: number;
            TeamId: number;
            TeamRole: TeamRoleEnum;
          }) =>
            apiClient('/Team/ExitTeam', {
              method: 'POST',
              body: JSON.stringify(data),
            }),

        getAllTeams: (userId: number) =>
    apiClient(`/Team/GetAllTeams?query=${userId}`, {
      method: 'GET',
    }),
    
}