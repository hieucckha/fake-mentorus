using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Saritasa.Tools.Common.Pagination;
using SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;
using SomeSandwich.FakeMentorus.UseCases.Users.CreateUser;
using SomeSandwich.FakeMentorus.UseCases.Users.ImportStudentIdTemplate;
using SomeSandwich.FakeMentorus.UseCases.Users.LockoutUser.LockUser;
using SomeSandwich.FakeMentorus.UseCases.Users.LockoutUser.UnlockUser;
using SomeSandwich.FakeMentorus.UseCases.Users.MappingStudentId;
using SomeSandwich.FakeMentorus.UseCases.Users.SearchUser;
using SomeSandwich.FakeMentorus.UseCases.Users.UpdateUser;
using SomeSandwich.FakeMentorus.Web.Requests;

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
    /// Update user information.
    /// </summary>
    /// <param name="command">Update user command.</param>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    [HttpPut]
    [Authorize]
    public async Task Update(UpdateUserCommand command, CancellationToken cancellationToken)
    {
        await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Lock a user.
    /// </summary>
    /// <param name="id">Id of user.</param>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    [HttpPut("{id:int}/lock")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task LockUser([FromRoute] int id, CancellationToken cancellationToken)
    {
        await mediator.Send(new LockUserCommand { UserId = id }, cancellationToken);
    }

    /// <summary>
    /// Unlock a user.
    /// </summary>
    /// <param name="id">Id of user.</param>
    /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
    [HttpPut("{id:int}/unlock")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task UnlockUser([FromRoute] int id, CancellationToken cancellationToken)
    {
        await mediator.Send(new UnlockUserCommand { UserId = id }, cancellationToken);
    }

    /// <summary>
    /// Mapping student id to user.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="studentId"></param>
    /// <param name="cancellationToken"></param>
    [HttpPatch("{id:int}/mapping")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task MappingStudentId([FromRoute] int id, [FromQuery] string? studentId,
        CancellationToken cancellationToken)
    {
        await mediator.Send(new MappingStudentIdCommand() { UserId = id, StudentId = studentId },
            cancellationToken);
    }

    /// <summary>
    /// Get users.
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("search")]
    [Authorize]
    public async Task<PagedListMetadataDto<UserDto>> GetUsers([FromQuery] SearchUserQuery request,
        CancellationToken cancellationToken)
    {
        var result = await mediator.Send(request, cancellationToken);
        return result.ToMetadataObject();
    }

    /// <summary>
    /// Import student id map with email by template.
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("student")]
    public async Task ImportStudentIdFromTemplate([FromForm] ImportStudentIdTemplateRequest request,
        CancellationToken cancellationToken)
    {
        await mediator.Send(new ImportStudentIdTemplateCommand
        {
            FileContent = request.File.OpenReadStream()
        }, cancellationToken);
    }
}
