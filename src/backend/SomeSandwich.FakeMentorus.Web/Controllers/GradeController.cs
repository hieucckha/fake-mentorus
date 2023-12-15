using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Grade.GenerateStudentGradeTemplate;
using SomeSandwich.FakeMentorus.UseCases.Grade.ImportStudentGrade;
using SomeSandwich.FakeMentorus.Web.Requests;

namespace SomeSandwich.FakeMentorus.Web.Controllers;

/// <summary>
/// Authentication controller.
/// </summary>
[ApiController]
[Route("api/grade")]
[ApiExplorerSettings(GroupName = "grade")]
[Authorize]
public class GradeController
{
    private readonly IMediator mediator;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="mediator">Mediator instance.</param>
    public GradeController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    /// <summary>
    /// Generate student grade template for import student grade.
    /// </summary>
    /// <param name="command">Command generate student grade template.</param>
    /// <param name="cancellationToken">Token to cancel the request.</param>
    [HttpGet("template")]
    public async Task<ActionResult> GenerateStudentGradeTemplate([FromQuery] GenerateStudentGradeTemplateCommand command, CancellationToken cancellationToken)
    {
        var result = await mediator.Send(command, cancellationToken);
        result.FileContent.Position = 0;

        return new FileStreamResult(result.FileContent, result.Mimetype) { FileDownloadName = result.FileName };
    }

    /// <summary>
    /// Import student grade from template.
    /// </summary>
    /// <param name="id">Id of course.</param>
    /// <param name="request">Request that hold the sheet of student grade.</param>
    /// <param name="cancellationToken">Token to cancel the request.</param>
    [HttpPost("template/{id:int}/import")]
    public async Task ImportStudentGrade([FromRoute] int id, [FromForm] ImportStudentGradeRequest request, CancellationToken cancellationToken)
    {
        var command = new ImportStudentGradeCommand { CourseId = id, FileContent = request.File.OpenReadStream() };

        await mediator.Send(command, cancellationToken);
    }
}
