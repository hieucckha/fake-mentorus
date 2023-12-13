using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SomeSandwich.FakeMentorus.Web.Controllers;

/// <summary>
/// Request controller.
/// </summary>
[ApiController]
[Route("api/request")]
[ApiExplorerSettings(GroupName = "request")]
public class RequestController
{
    private readonly IMediator mediator;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="mediator"></param>
    public RequestController(IMediator mediator)
    {
        this.mediator = mediator;
    }
    //
    // [HttpPost]
    // [Authorize]
    // public async Task<int> Create(CreateGradeCompositionCommand command, CancellationToken cancellationToken)
    // {
    //     return await mediator.Send(command, cancellationToken);
    // }
}
