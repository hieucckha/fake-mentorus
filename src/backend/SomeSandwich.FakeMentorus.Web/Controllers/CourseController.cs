using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Courses.AssignByCode;
using SomeSandwich.FakeMentorus.UseCases.Courses.AssignByEmail;
using SomeSandwich.FakeMentorus.UseCases.Courses.Common;
using SomeSandwich.FakeMentorus.UseCases.Courses.CreateCourse;
using SomeSandwich.FakeMentorus.UseCases.Courses.CreateInvitationLinkByEmail;
using SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseById;
using SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseByUserId;
using SomeSandwich.FakeMentorus.UseCases.Courses.UpdateCourse;
using SomeSandwich.FakeMentorus.Web.Requests;

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
        CancellationToken cancellationToken)
    {
        var result =
            await mediator.Send(new GetCourseByIdQuery() { CourseId = courseId },
                cancellationToken);

        return result;
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
    /// Create invitation link per user and send to email.
    /// </summary>
    /// <param name="courseId"></param>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("{courseId:int}/invite-email")]
    [Authorize]
    public async Task CreateInviteLinkByEmail(
        [FromRoute] int courseId,
        [FromBody] InviteByEmailRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateInvitationLinkByEmailCommand() { CourseId = courseId, Email = request.Email };
        await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Join course by invitation link in email.
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("invite-email/confirm")]
    [Authorize]
    public async Task JoinCourseByEmail(
        [FromBody] JoinCourseByEmailRequest request,
        CancellationToken cancellationToken)
    {
        var command = new AssignByEmailCommand() { Token = request.Token };
        await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Join course by invite code (for anonymous users).
    /// </summary>
    /// <param name="courseId"></param>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("{courseId:int}/join")]
    [Authorize]
    public async Task JoinCourseByCode(
        [FromRoute] int courseId,
        [FromBody] JoinCourseByCodeRequest request,
        CancellationToken cancellationToken)
    {
        var command = new AssignByCodeCommand() { CourseId = courseId, InviteCode = request.InviteCode };

        await mediator.Send(command, cancellationToken);
    }
}
