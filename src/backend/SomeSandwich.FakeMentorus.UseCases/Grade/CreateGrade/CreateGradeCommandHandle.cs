using MediatR;
using Microsoft.EntityFrameworkCore;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.CreateGrade;

/// <summary>
/// Handle for <see cref="CreateGradeCommand"/>.
/// </summary>
internal class CreateGradeCommandHandle : IRequestHandler<CreateGradeCommand, int>
{
    private readonly IAppDbContext dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="dbContext"></param>
    public CreateGradeCommandHandle(IAppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<int> Handle(CreateGradeCommand request, CancellationToken cancellationToken)
    {
        // var check = await dbContext.Grades.AnyAsync(
        //     e => e.GradeCompositionId == request.GradeCompositionId && e.StudentId == request.StudentId,
        //     cancellationToken);
        // if (check)
        // {
        //     throw new NotFoundException("Grade already exists");
        // }
        //
        // var grade = new Domain.Grade.Grade
        // {
        //     GradeCompositionId = request.GradeCompositionId,
        //     StudentId = request.StudentId,
        //     GradeValue = request.GradeValue
        // };
        //
        // await dbContext.Grades.AddAsync(grade, cancellationToken);
        // await dbContext.SaveChangesAsync(cancellationToken);

        // return grade.Id;
        return 1;
    }
}
