using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Saritasa.Tools.Domain.Exceptions;
using Saritasa.Tools.EntityFrameworkCore;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;
using SomeSandwich.FakeMentorus.UseCases.Common.Service;
using SomeSandwich.FakeMentorus.UseCases.Request.Common;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseById;

/// <summary>
/// Handler for <see cref="GetCourseByIdQuery" />.
/// </summary>
public class GetCourseByIdQueryHandle : IRequestHandler<GetCourseByIdQuery, CourseDetailDto>
{
    private readonly ILogger<GetCourseByIdQueryHandle> logger;
    private readonly IAppDbContext dbContext;
    private readonly IAccessService accessService;
    private readonly IAppSettings appSettings;
    private readonly IMapper mapper;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger">Logger instance.</param>
    /// <param name="dbContext">Database context instance.</param>
    /// <param name="accessService">Access service instance.</param>
    /// <param name="appSettings">App settings instance.</param>
    /// <param name="mapper">Mapper instance.</param>
    public GetCourseByIdQueryHandle(
        IAppDbContext dbContext,
        IMapper mapper,
        IAccessService accessService,
        ILogger<GetCourseByIdQueryHandle> logger,
        IAppSettings appSettings)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
        this.accessService = accessService;
        this.logger = logger;
        this.appSettings = appSettings;
    }

    /// <inheritdoc />
    public async Task<CourseDetailDto> Handle(GetCourseByIdQuery request,
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Try to get course with id {CourseId}", request.CourseId);
        if (!await accessService.HasAccessToCourse(request.CourseId, cancellationToken))
        {
            logger.LogWarning("User don't have access to course with id {CourseId}",
                request.CourseId);
            throw new ForbiddenException("You don't have access to this course.");
        }

        var course =
            await dbContext.Courses
                .Include(c => c.Creator)
                .Include(c => c.GradeCompositions.OrderBy(e => e.Order))
                .ThenInclude(gc => gc.Grades)
                .ThenInclude(g => g.Request)
                .Include(c => c.StudentInfos)
                .ThenInclude(si => si.Student)
                .ThenInclude(s => s.User)
                .Include(c => c.Students).ThenInclude(cs => cs.Student)
                .Include(c => c.Teachers).ThenInclude(ct => ct.Teacher)
                .GetAsync(c => c.Id == request.CourseId, cancellationToken);

        logger.LogInformation("Course with id {CourseId} was found", request.CourseId);
        var result = mapper.Map<CourseDetailDto>(course);

        var requests = course.GradeCompositions
            .SelectMany(gc => gc.Grades)
            .Select(g => g.Request)
            .Where(r => r != null)
            .ToList();
        result.Requests = mapper.Map<List<RequestDto>>(requests);

        var listStudent = course.StudentInfos.Select(e => new
        {
            e.StudentId,
            UserId = e.Student.User?.Id ?? null,
            e.Name
        }).ToList();

        foreach (var resultRequest in result.Requests)
        {
            resultRequest.StudentName = listStudent
                .Where(e => e.UserId == resultRequest.StudentId)
                .Select(e => e.Name)
                .FirstOrDefault() ?? "";
        }

        // TODO: Need url from frontend
        result.InviteLink = $"{appSettings.FrontendUrl}/invite/{course.ClassCode}";

        return result;
    }
}
