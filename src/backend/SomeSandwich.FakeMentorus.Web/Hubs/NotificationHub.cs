using Microsoft.AspNetCore.SignalR;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.Web.Hubs;

/// <summary>
///
/// </summary>
public class NotificationHub : Hub<INotificationHubType>, INotificationService
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="user"></param>
    /// <param name="message"></param>
    /// <param name="cancellationToken"></param>
    public async Task SendNotification(string user, string message, CancellationToken cancellationToken)
    {
        await Clients.All.SendNotification(user, message, cancellationToken);
    }
}
