using MediatR;
using Microsoft.EntityFrameworkCore;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.GetGradeByStudentId;

/// <summary>
/// Handler for <see cref="GetGradeByStudentIdQuery"/>.
/// </summary>
public class GetGradeByStudentIdQueryHandle : IRequestHandler<GetGradeByStudentIdQuery, GetGradeByStudentIdDto>
{
    private readonly IAppDbContext dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="dbContext"></param>
    public GetGradeByStudentIdQueryHandle(IAppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<GetGradeByStudentIdDto> Handle(GetGradeByStudentIdQuery request,
        CancellationToken cancellationToken)
    {
        if (dbContext.Students.Any(x => x.StudentId == request.StudentId))
        {
            throw new NotFoundException("Student not found.");
        }

        var course = await dbContext.Courses
            .Where(x => x.Id == request.CourseId)
            .FirstOrDefaultAsync(cancellationToken);

        if (course == null)
        {
            throw new NotFoundException("Course not found.");
        }

        var studentName = await dbContext.StudentInfos
            .Where(x => x.StudentId == request.StudentId)
            .Select(x => x.Name)
            .FirstOrDefaultAsync(cancellationToken);

        if (studentName == null)
        {
            throw new NotFoundException("Student is not assigned to this course.");
        }

        if (course.IsFinished == false)
        {
            throw new NotFoundException("Course is not finished.");
        }

        var grades = await dbContext.Grades
            .Include(x => x.Student)
            .Include(x => x.GradeComposition)
            .Where(e => e.GradeComposition.CourseId == request.CourseId)
            .Where(e => e.Student.StudentId == request.StudentId)
            .ToListAsync(cancellationToken);

        var gradeDetails = course.GradeCompositions.Select(x => new GradeDetailByStudentIdDto()
        {
            GradeCompositionId = x.Id,
            GradeCompositionName = x.Name ?? "",
            GradeValue = grades.FirstOrDefault(g => g.GradeCompositionId == x.Id)!.GradeValue
        }).ToList();

        var result = new GetGradeByStudentIdDto
        {
            StudentId = request.StudentId, StudentName = studentName, GradeDetails = gradeDetails
        };

        return result;
    }
}
