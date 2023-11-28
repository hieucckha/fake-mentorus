using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Users.UpdateUser;

/// <summary>
///     Command to update user.
/// </summary>
internal class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand>
{
    private readonly ILoggedUserAccessor loggedUserAccessor;
    private readonly ILogger<UpdateUserCommandHandler> logger;
    private readonly UserManager<User> userManager;

    /// <summary>
    ///     Constructor.
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="userManager"></param>
    /// <param name="loggedUserAccessor"></param>
    public UpdateUserCommandHandler(ILogger<UpdateUserCommandHandler> logger, UserManager<User> userManager,
        ILoggedUserAccessor loggedUserAccessor)
    {
        this.logger = logger;
        this.userManager = userManager;
        this.loggedUserAccessor = loggedUserAccessor;
    }

    /// <inheritdoc />
    public Task Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var loggedUserId = loggedUserAccessor.GetCurrentUserId();
        logger.LogInformation($"User {loggedUserId} is updating his profile.");

        var userToUpdate = userManager.Users.FirstOrDefault(u => u.Id == loggedUserId);
        if (userToUpdate == null)
        {
            logger.LogError($"User {loggedUserId} not found.");
            throw new Exception($"User {loggedUserId} not found.");
        }

        userToUpdate.Email = request.Email ?? userToUpdate.Email;
        userToUpdate.FirstName = request.FirstName ?? userToUpdate.FirstName;
        userToUpdate.LastName = request.LastName ?? userToUpdate.LastName;
        userToUpdate.SchoolId = request.SchoolId ?? userToUpdate.SchoolId;

        userManager.UpdateAsync(userToUpdate);
        logger.LogInformation($"User {loggedUserId} updated.");

        return Task.CompletedTask;
    }
}
