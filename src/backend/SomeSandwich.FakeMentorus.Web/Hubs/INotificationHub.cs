namespace SomeSandwich.FakeMentorus.Web.Hubs;

/// <summary>
///
/// </summary>
public interface INotificationHubType
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="user"></param>
    /// <param name="message"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task SendNotification(string user, string message, CancellationToken cancellationToken);
}
