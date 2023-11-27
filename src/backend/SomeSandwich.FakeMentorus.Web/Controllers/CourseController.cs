using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Courses.AssignByCode;
using SomeSandwich.FakeMentorus.UseCases.Courses.AssignByToken;
using SomeSandwich.FakeMentorus.UseCases.Courses.Common;
using SomeSandwich.FakeMentorus.UseCases.Courses.CreateCourse;
using SomeSandwich.FakeMentorus.UseCases.Courses.CreateInvitationLinkByEmail;
using SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseById;
using SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseByUserId;
using SomeSandwich.FakeMentorus.UseCases.Courses.UpdateCourse;

namespace SomeSandwich.FakeMentorus.Web.Controllers;

/// <summary>
/// Course controller.
/// </summary>
[ApiController]
[Route("api/course")]
[ApiExplorerSettings(GroupName = "course")]
public class CourseController
{
    private readonly IMediator mediator;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="mediator"></param>
    public CourseController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    /// <summary>
    /// Create new course.
    /// </summary>
    /// <param name="command">Create course command.</param>
    [HttpPost("")]
    [Authorize]
    public async Task<int> Create(CreateCourseCommand command, CancellationToken cancellationToken)
    {
        return await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// List courses query by user id.
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("")]
    [Authorize]
    public async Task<IEnumerable<CourseDto>> GetCoursesByUserId(
        [FromQuery] int userId,
        CancellationToken
            cancellationToken)
    {
        var result =
            await mediator.Send(new GetCourseByUserIdQuery() { UserId = userId },
                cancellationToken);

        return result;
    }

    /// <summary>
    /// Get course by id.
    /// </summary>
    /// <param name="courseId"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("{courseId:int}")]
    [Authorize]
    public async Task<CourseDetailDto> GetCourseById(
        [FromRoute] int courseId,
        CancellationToken
            cancellationToken)
    {
        var result =
            await mediator.Send(new GetCourseByIdQuery() { CourseId = courseId },
                cancellationToken);

        return result;
    }

    /// <summary>
    /// Invite user to course by email.
    /// </summary>
    /// <param name="courseId"></param>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("{courseId:int}/invite")]
    [Authorize]
    public async Task<CreateInviteLinkResult> CreateInviteLinkByEmail(
        [FromRoute] int courseId,
        [FromBody] CreateLinkRequest request,
        CancellationToken cancellationToken)
    {
        var command =
            new CreateInvitationLinkByEmailCommand() { CourseId = courseId, Email = request.Email };
        return await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Update course.
    /// </summary>
    /// <param name="courseId"></param>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    [HttpPatch("{courseId:int}")]
    public async Task Update(
        [FromRoute] int courseId,
        [FromBody] UpdateCourseRequest request,
        CancellationToken cancellationToken)
    {
        var command = new UpdateCourseCommand()
        {
            CourseId = courseId, Name = request.Name, Description = request.Description
        };
        await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Join course by invite code.
    /// </summary>
    /// <param name="courseId"></param>
    /// <param name="inviteCode"></param>F
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("{courseId:int}/join-course/{inviteCode}")]
    [Authorize]
    public async Task JoinCourseByCode(
        [FromRoute] int courseId,
        [FromRoute] string inviteCode,
        CancellationToken cancellationToken)
    {
        var command = new AssignByCodeCommand() { CourseId = courseId, InviteCode = inviteCode };

        await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Join course by token.
    /// </summary>
    /// <param name="token"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("join-course")]
    [Authorize]
    public async Task JoinCourseByToken(
        [FromQuery] string token,
        CancellationToken cancellationToken)
    {
        var command = new AssignByTokenCommand() { Token = token };
        await mediator.Send(command, cancellationToken);
    }
}
