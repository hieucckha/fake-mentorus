using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using SomeSandwich.FakeMentorus.Domain.Users;

namespace SomeSandwich.FakeMentorus.UseCases.Users.CreateUser;

/// <summary>
/// Handler for <see cref="CreateUserCommand"/>.
/// </summary>
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
{
    private readonly ILogger<CreateUserCommandHandler> logger;
    private readonly UserManager<User> userManager;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger">Logger instance.</param>
    /// <param name="userManager"></param>
    public CreateUserCommandHandler(ILogger<CreateUserCommandHandler> logger, UserManager<User> userManager)
    {
        this.logger = logger;
        this.userManager = userManager;
    }

    /// <inheritdoc />
    public async Task Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        var user = new User
        {
            Email = command.Email,
            UserName = command.Email,
            FirstName = command.FirstName,
            LastName = command.LastName
        };

        var result = await userManager.CreateAsync(user, command.Password);
        logger.LogInformation($"User creation result: {result}.");
        if (result.Succeeded)
        {
            logger.LogInformation($"User id: {user.Id}.");
        }
    }
}
