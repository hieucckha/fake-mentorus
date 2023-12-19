using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;
using SomeSandwich.FakeMentorus.UseCases.Grade.Common;
using SomeSandwich.FakeMentorus.UseCases.GradeComposition.Common;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.GetGradeByUserId;

public class GetGradeByUserIdQueryHandler : IRequestHandler<GetGradeByUserIdQuery, GetGradeByUserIdResult>
{
    private readonly IAppDbContext appDbContext;
    private readonly IMapper mapper;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="appDbContext"></param>
    /// <param name="mapper"></param>
    public GetGradeByUserIdQueryHandler(IAppDbContext appDbContext, IMapper mapper)
    {
        this.appDbContext = appDbContext;
        this.mapper = mapper;
    }

    /// <inheritdoc />
    public async Task<GetGradeByUserIdResult> Handle(GetGradeByUserIdQuery query, CancellationToken cancellationToken)
    {
        var gradeComposites = await appDbContext.GradeCompositions
            .Include(e => e.Grades)
            .Where(e => e.CourseId == query.CourseId && e.IsDeleted == false)
            .OrderBy(e => e.GradeScale)
            .ThenBy(e => e.Id)
            .ToListAsync(cancellationToken);

        var gradeCells = gradeComposites.Select(e =>
        {
            var grade = e.Grades.FirstOrDefault(g => g.GradeCompositionId == e.Id && g.StudentId == query.StudentId);
            return new GradeCellDto()
            {
                Id = grade?.Id,
                GradeCompositionId = e.Id,
                GradeValue = grade?.GradeValue,
                IsRequested = grade?.IsRequested ?? false,
            };
        }).ToList();

        var student = await appDbContext.StudentInfos
            .Include(e => e.Student).ThenInclude(f => f.User)
            .Where(e => e.StudentId == query.StudentId && e.CourseId == query.CourseId)
            .FirstOrDefaultAsync(cancellationToken);
        var studentName = student?.Name ?? "";
        var userId = student?.Student?.User?.Id;

        var gradeCell = new GradeCell()
        {
            StudentId = query.StudentId, StudentName = studentName, UserId = userId, GradeDto = gradeCells,
        };

        var result = new GetGradeByUserIdResult()
        {
            CourseId = query.CourseId,
            GradeCompositionDtos = gradeComposites.Select(e => mapper.Map<GradeCompositionDto>(e)).ToList(),
            Students = new List<GradeCell>() { gradeCell },
        };

        return result;
    }
}
