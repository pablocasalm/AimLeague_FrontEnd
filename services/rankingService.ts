import { apiClient } from "./apiClient";

export const rankingService = {
    getRanking: () => apiClient('User/getRanking', {
        method: 'GET',
    })
}