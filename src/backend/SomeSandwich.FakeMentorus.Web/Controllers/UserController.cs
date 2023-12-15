using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Users.CreateUser;
using SomeSandwich.FakeMentorus.UseCases.Users.UpdateUser;

namespace SomeSandwich.FakeMentorus.Web.Controllers;

/// <summary>
/// User controller.
/// </summary>
[ApiController]
[Route("api/user")]
[ApiExplorerSettings(GroupName = "user")]
public class UserController : ControllerBase
{
    private readonly IMediator mediator;

    /// <summary>
    /// Constructor.
    /// </summary>
    public UserController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    /// <summary>
    /// Create new user by email and password.
    /// </summary>
    /// <param name="command">Create user command.</param>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    [HttpPost]
    public async Task Create(CreateUserCommand command, CancellationToken cancellationToken)
    {
        await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="command"></param>
    /// <param name="cancellationToken"></param>
    [HttpPut]
    [Authorize]
    public async Task Update(UpdateUserCommand command, CancellationToken cancellationToken)
    {
        await mediator.Send(command, cancellationToken);
    }
}
