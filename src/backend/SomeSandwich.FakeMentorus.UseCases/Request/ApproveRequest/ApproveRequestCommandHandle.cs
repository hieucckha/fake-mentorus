using MediatR;
using Microsoft.EntityFrameworkCore;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Domain.Request;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Request.ApproveRequest;

/// <summary>
/// Handle for <see cref="ApproveRequestCommand"/>.
/// </summary>
public class ApproveRequestCommandHandle : IRequestHandler<ApproveRequestCommand>
{
    private readonly IAppDbContext dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="dbContext"></param>
    public ApproveRequestCommandHandle(IAppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task Handle(ApproveRequestCommand command, CancellationToken cancellationToken)
    {
        var request = await dbContext.Requests.FirstOrDefaultAsync(x => x.Id == command.RequestId, cancellationToken);
        if (request == null)
        {
            throw new NotFoundException("Request not found");
        }

        var grade = await dbContext.Grades.FirstOrDefaultAsync(x => x.Id == request.GradeId, cancellationToken);

        if (grade == null)
        {
            throw new NotFoundException("Grade not found");
        }

        grade.GradeValue = command.GradeValue;
        grade.UpdatedAt = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);

        request.Status = RequestStatus.Approved;
        request.UpdatedAt = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
