using MediatR;
using Microsoft.AspNetCore.Http;
using SomeSandwich.FakeMentorus.Domain.Users;

namespace SomeSandwich.FakeMentorus.UseCases.Users.UpdateUser;

/// <summary>
///     Command to update user.
/// </summary>
public class UpdateUserCommand : IRequest
{
    /// <inheritdoc cref="User.Email" />
    public string? Email { get; set; }

    /// <inheritdoc cref="User.FirstName" />
    public string? FirstName { get; set; }

    /// <inheritdoc cref="User.LastName" />
    public string? LastName { get; set; }

    /// <summary>
    ///     Avatar file.
    /// </summary>
    public IFormFile? AvatarFile { get; set; }

    /// <inheritdoc cref="User.SchoolId" />
    public string? SchoolId { get; set; }
}
