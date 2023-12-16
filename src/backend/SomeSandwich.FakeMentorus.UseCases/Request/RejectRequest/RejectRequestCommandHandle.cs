using MediatR;
using Microsoft.EntityFrameworkCore;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Domain.Request;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Request.RejectRequest;

/// <summary>
/// Handle for <see cref="RejectRequestCommand"/>.
/// </summary>
public class RejectRequestCommandHandle : IRequestHandler<RejectRequestCommand>
{
    private readonly IAppDbContext dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="dbContext"></param>
    public RejectRequestCommandHandle(IAppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task Handle(RejectRequestCommand command, CancellationToken cancellationToken)
    {
        var request = await dbContext.Requests.FirstOrDefaultAsync(x => x.Id == command.RequestId, cancellationToken);
        if (request == null)
        {
            throw new NotFoundException("Request not found");
        }

        request.Status = RequestStatus.Rejected;
        request.UpdatedAt = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
