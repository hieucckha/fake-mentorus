using System.Web;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Users.ActivateUser.RegisterActivateUser;

/// <summary>
/// Handler for <see cref="RegisterActivateUserCommand"/>.
/// </summary>
public class RegisterActivateUserCommandHandler : IRequestHandler<RegisterActivateUserCommand>
{
    private readonly UserManager<User> userManager;
    private readonly IEmailSender emailSender;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="userManager">User manager.</param>
    /// <param name="emailSender">Email sender service.</param>
    public RegisterActivateUserCommandHandler(UserManager<User> userManager, IEmailSender emailSender)
    {
        this.userManager = userManager;
        this.emailSender = emailSender;
    }

    /// <inheritdoc />
    public async Task Handle(RegisterActivateUserCommand command, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user is null)
        {
            throw new NotFoundException("User not found");
        }

        if (user.EmailConfirmed == false)
        {
            var code = await userManager.GenerateEmailConfirmationTokenAsync(user);

            await emailSender.SendEmailAsync(
                $"<div>Please confirm your account by <a href='http://localhost:5173/activate-account/confirm?email={HttpUtility.UrlEncode(user.Email)}&code={HttpUtility.UrlEncode(code)}'>clicking here</a>.</div>",
                "Activate your account",
                new List<string> { user.Email! }, cancellationToken);
        }
    }
}
