import { apiClient } from "./apiClient";

export const dashboardService = {
    getDashboardInfo: () => apiClient('/Dashboard/GetDashboardInfo', {
        method: 'GET'
    })
}