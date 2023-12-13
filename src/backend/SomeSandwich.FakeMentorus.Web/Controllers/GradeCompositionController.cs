using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Grade.CreateGrade;
using SomeSandwich.FakeMentorus.UseCases.GradeComposition.CreateGradeComposition;
using SomeSandwich.FakeMentorus.UseCases.GradeComposition.GetGradeCompositionById;
using SomeSandwich.FakeMentorus.Web.Requests;

namespace SomeSandwich.FakeMentorus.Web.Controllers;

/// <summary>
/// GradeComposition controller.
/// </summary>
[ApiController]
[Route("api/grade-composition")]
[ApiExplorerSettings(GroupName = "grade-composition")]
public class GradeCompositionController
{
    private readonly IMediator mediator;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="mediator"></param>
    public GradeCompositionController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    /// <summary>
    /// Create new grade composition.
    /// </summary>
    /// <param name="command"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost]
    [Authorize]
    public async Task<int> Create(CreateGradeCompositionCommand command, CancellationToken cancellationToken)
    {
        return await mediator.Send(command, cancellationToken);
    }

    /// <summary>
    /// Get grade composition by id.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("{id:int}")]
    [Authorize]
    public async Task<GradeCompositionDetailDto> Get([FromRoute] int id, CancellationToken cancellationToken)
    {
        return await mediator.Send(new GetGradeCompositionByIdQuery() { Id = id }, cancellationToken);
    }

    /// <summary>
    /// Add student grade.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="studentId"></param>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    [HttpPost("{id:int}/students/{studentId:int}")]
    [Authorize]
    public async Task AddGrade([FromRoute] int id, [FromRoute] int studentId,
        [FromBody] AddGradeRequest request, CancellationToken cancellationToken)
    {
        await mediator.Send(
            new CreateGradeCommand()
            {
                GradeCompositionId = id, StudentId = studentId, GradeValue = request.GradeValue
            },
            cancellationToken);
    }
}
