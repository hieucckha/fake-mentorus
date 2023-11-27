using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Users.AuthenticateUser;
using SomeSandwich.FakeMentorus.UseCases.Users.AuthenticateUser.LoginUser;
using SomeSandwich.FakeMentorus.UseCases.Users.AuthenticateUser.LoginUserFacebook;
using SomeSandwich.FakeMentorus.UseCases.Users.AuthenticateUser.LoginUserGoogle;
using SomeSandwich.FakeMentorus.UseCases.Users.AuthenticateUser.RefreshToken;
using SomeSandwich.FakeMentorus.UseCases.Users.GetUserById;
using SomeSandwich.FakeMentorus.Web.Infrastructure.Web;

namespace SomeSandwich.FakeMentorus.Web.Controllers;

/// <summary>
/// Authentication controller.
/// </summary>
[ApiController]
[Route("api/auth")]
[ApiExplorerSettings(GroupName = "auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator mediator;

    /// <summary>
    /// Constructor.
    /// </summary>
    public AuthController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    /// <summary>
    /// Authenticate user by email and password.
    /// </summary>
    /// <param name="command">Login command.</param>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    [HttpPost]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task<TokenModel> Authenticate([Required] LoginUserCommand command, CancellationToken cancellationToken)
    {
        return (await mediator.Send(command, cancellationToken)).TokenModel;
    }

    /// <summary>
    /// Authenticate user by google token.
    /// </summary>
    /// <param name="command">Login user by google command.</param>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    /// <returns></returns>
    [HttpPost("google")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task<TokenModel> AuthenticateGoogle([Required] LoginUserGoogleCommand command, CancellationToken cancellationToken)
    {
        return (await mediator.Send(command, cancellationToken)).TokenModel;
    }

    /// <summary>
    /// Authenticate user by facebook token.
    /// </summary>
    /// <param name="command">Login user by facebook command.</param>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    /// <returns></returns>
    [HttpPost("facebook")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task<TokenModel> AuthenticateFacebook([Required] LoginUserFacebookCommand command, CancellationToken cancellationToken)
    {
        return (await mediator.Send(command, cancellationToken)).TokenModel;
    }

    /// <summary>
    /// Get new token by refresh token.
    /// </summary>
    /// <param name="command">Refresh token command.</param>
    /// <returns>New authentication and refresh tokens.</returns>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    [HttpPut]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    public Task<TokenModel> RefreshToken([Required] RefreshTokenCommand command, CancellationToken cancellationToken)
        => mediator.Send(command, cancellationToken);

    /// <summary>
    /// Get current logged user info.
    /// </summary>
    /// <returns>Current logged user info.</returns>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    [HttpGet]
    [Authorize]
    public async Task<UserDetailsDto> GetMe(CancellationToken cancellationToken)
    {
        var query = new GetUserByIdQuery
        {
            UserId = User.GetCurrentUserId()
        };
        return await mediator.Send(query, cancellationToken);
    }
}
