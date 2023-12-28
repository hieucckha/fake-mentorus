import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://midterm-backend.somesandwich.rocks/notification", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();

connection.on("ReceiveNotification", (user, message) => {
    console.log(user);
    console.log(message);
});

export default connection;