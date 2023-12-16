using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Request.Common;
using SomeSandwich.FakeMentorus.UseCases.Request.CreateRequest;

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

    /// <summary>
    /// Create request.
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    [HttpPost]
    [Authorize]
    public async Task<RequestDto> CreateRequest(CreateRequestCommand command)
    {
        var result = await mediator.Send(command);
        return result;
    }
}
