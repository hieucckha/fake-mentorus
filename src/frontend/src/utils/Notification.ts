import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://midterm-backend.somesandwich.rocks/notification")
    .build();

connection.on("SendNotification", data => {
    console.log(data);
});

export default connection;