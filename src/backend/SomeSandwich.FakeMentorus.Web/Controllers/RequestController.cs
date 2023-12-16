using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SomeSandwich.FakeMentorus.UseCases.Request.ApproveRequest;
using SomeSandwich.FakeMentorus.UseCases.Request.Common;
using SomeSandwich.FakeMentorus.UseCases.Request.CreateRequest;
using SomeSandwich.FakeMentorus.UseCases.Request.RejectRequest;
using SomeSandwich.FakeMentorus.Web.Requests;

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

    /// <summary>
    /// Approve request.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="request"></param>
    [HttpPost("{id:int}/approve")]
    [Authorize]
    public async Task ApproveRequest([FromRoute] int id, [FromBody] ApproveRequestReq request)
    {
        var command = new ApproveRequestCommand() { RequestId = id, GradeValue = request.GradeValue };
        await mediator.Send(command);
    }

    /// <summary>
    /// Reject request.
    /// </summary>
    /// <param name="id"></param>
    [HttpPost("{id:int}/reject")]
    [Authorize]
    public async Task RejectRequest([FromRoute] int id)
    {
        var command = new RejectRequestCommand() { RequestId = id };
        await mediator.Send(command);
    }
}
