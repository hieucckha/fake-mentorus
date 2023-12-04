using MediatR;
using Microsoft.AspNetCore.Identity;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Users.ResetPasswordUser.GenerateTokenResetPasswordUser;

/// <summary>
/// Handler for <see cref="GenerateTokenResetPasswordUserCommand"/>.
/// </summary>
public class GenerateTokenResetPasswordUserCommandHandler : IRequestHandler<GenerateTokenResetPasswordUserCommand>
{
    private readonly UserManager<User> userManager;
    private readonly IEmailSender emailSender;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="userManager">User manager.</param>
    /// <param name="emailSender">Email sender service.</param>
    public GenerateTokenResetPasswordUserCommandHandler(UserManager<User> userManager, IEmailSender emailSender)
    {
        this.userManager = userManager;
        this.emailSender = emailSender;
    }

    /// <inheritdoc />
    public async Task Handle(GenerateTokenResetPasswordUserCommand command, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user is null)
        {
            throw new NotFoundException("User not found");
        }

        var code = await userManager.GeneratePasswordResetTokenAsync(user);
        await emailSender.SendEmailAsync(
            $"Please reset your password by <a href='http://localhost:5173//reset-password/confirm?email={user.Email}&code={code}'>clicking here</a>.",
            "Reset your password",
            new List<string> { user.Email! }, cancellationToken);
    }
}
