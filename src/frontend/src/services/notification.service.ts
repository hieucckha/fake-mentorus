import localStorageService from "./localStorage.service";

const notificationService = {
    addNotification: (message: string) => {
        const notifications = notificationService.getNotifications() ?? [];
        localStorageService.setItem("notifications", JSON.stringify([message, ...notifications]));
    },

    getNotifications:() :string[] => {
        const notifications = localStorageService.getItem("notifications") as string ?? "[]";
        return JSON.parse(notifications) as string[];
    }
}


export default notificationService;