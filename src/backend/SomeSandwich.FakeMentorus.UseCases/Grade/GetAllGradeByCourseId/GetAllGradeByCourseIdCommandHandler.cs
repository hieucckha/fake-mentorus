using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;
using SomeSandwich.FakeMentorus.UseCases.Grade.Common;
using SomeSandwich.FakeMentorus.UseCases.GradeComposition.Common;
using SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.GetAllGradeByCourseId;

/// <summary>
/// Handler for <see cref="GetAllGradeByCourseIdCommand"/>.
/// </summary>
internal class GetAllGradeByCourseIdCommandHandler : IRequestHandler<GetAllGradeByCourseIdCommand, GetAllGradeByCourseIdResult>
{
    private readonly ILogger<GetAllGradeByCourseIdCommandHandler> logger;
    private readonly IAppDbContext appDbContext;
    private readonly IMapper mapper;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="appDbContext"></param>
    /// <param name="mapper"></param>
    public GetAllGradeByCourseIdCommandHandler(ILogger<GetAllGradeByCourseIdCommandHandler> logger, IAppDbContext appDbContext, IMapper mapper)
    {
        this.logger = logger;
        this.appDbContext = appDbContext;
        this.mapper = mapper;
    }

    /// <inheritdoc />
    public async Task<GetAllGradeByCourseIdResult> Handle(GetAllGradeByCourseIdCommand command, CancellationToken cancellationToken)
    {
        // List all user
        var studentUsers = await appDbContext.Users
            .Include(e => e.ClassesStudent)
            .Where(e => e.ClassesStudent.Any(cs => cs.CourseId == command.CourseId))
            .ToListAsync(cancellationToken);

        var studentIds = studentUsers
            .Select(e => e.StudentId)
            .ToList();

        // UserId | Not StudentId
        var userWithoutStudentId = studentUsers
            .Where(e => e.StudentId == null)
            .ToList();

        // UserId | StudentId
        var userWithStudentId = studentUsers
            .Where(e => e.StudentId != null)
            .ToList();
        var studentId1 = userWithStudentId.Select(e => e.StudentId).ToList();

        // Not UserId | StudentId
        var studentWithoutUserid = await appDbContext.StudentInfos
            .Where(e => e.CourseId == command.CourseId)
            .Where(e => !studentIds.Contains(e.StudentId))
            .ToListAsync(cancellationToken);

        var studentId2 = studentWithoutUserid.Select(e => e.StudentId).ToList();

        // All grade
        var gradeComposites = await appDbContext.GradeCompositions
            .Include(e => e.Grades)
            .Where(e => e.CourseId == command.CourseId)
            .OrderBy(e => e.GradeScale)
            .ToListAsync(cancellationToken);

        var gradeTable = new Dictionary<string, List<GradeDto>>();
        var isFirst = true;

        foreach (var gradeComposition in gradeComposites)
        {
            if (isFirst)
            {
                foreach (var grade in gradeComposition.Grades)
                {
                    var gradesStudent = new List<GradeDto>(gradeComposites.Count) { mapper.Map<GradeDto>(grade) };
                    gradeTable.Add(grade.StudentId, gradesStudent);
                }

                isFirst = false;
            }
            else
            {
                foreach (var grade in gradeComposition.Grades)
                {
                    var gradeStudent = gradeTable.GetValueOrDefault(grade.StudentId);

                    gradeStudent?.Append(mapper.Map<GradeDto>(grade));
                }
            }
        }

        var gradeUserAndStudent = gradeTable
            .Where(e => studentId1.Contains(e.Key))
            .Select(pair =>
            {
                return new GradeCell
                {
                    StudnetId = pair.Key,
                    UserId = userWithStudentId.First(e => e.StudentId == pair.Key).Id,
                    GradeDto = pair.Value
                };
            }).ToList();

        var gradeNotUserAndStudent = gradeTable
            .Where(e => studentId2.Contains(e.Key))
            .Select(pair => new GradeCell
            {
                StudnetId = pair.Key,
                UserId = null,
                GradeDto = pair.Value
            }).ToList();

        var result = new GetAllGradeByCourseIdResult
        {
            CourseId = command.CourseId,
            GradeCompositionDtos = mapper.Map<IReadOnlyList<GradeCompositionDto>>(gradeComposites),
            StudentWithUserId = gradeUserAndStudent,
            StudentWithoutUserId = gradeNotUserAndStudent,
            UserWithoutStudentId = userWithoutStudentId.Select(e => mapper.Map<UserDto>(e)).ToList()
        };

        return result;
    }
}
