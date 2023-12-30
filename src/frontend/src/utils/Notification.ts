import * as signalR from "@microsoft/signalr";
import notificationService from "../services/notification.service";
import localStorageService from "../services/localStorage.service";

const connection = new signalR.HubConnectionBuilder()
	.withUrl(`${import.meta.env["VITE_API_URL"]}/notification`, {
		skipNegotiation: true,
		transport: signalR.HttpTransportType.WebSockets,
	})
	.build();

connection.on("ReceiveNotification", (user, message) => {
    const userEmail = localStorageService.getItem("user");
    console.log("Received notification",userEmail, user, message);
	if (userEmail === user) {
		notificationService.addNotification(message);
	}
});

export default connection;
