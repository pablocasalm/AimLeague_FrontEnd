import { apiClient } from "./apiClient";

export const userService = {

    register: (registerData: {
        Username: string,
        Password: string,
        RepeatPassword: string,
        Email: string,
        FirstName: string,
        LastName: string,
        DiscordUser: string,
        SteamId: string
    }) => apiClient('/User/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
    }),

    login: (credentials: {EmailOrUsername: string, Password: string}) => apiClient('/User/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }), 

    getProfileInfo: () => apiClient('/User/getProfileInfo', {
        method: 'GET',
    }),


}