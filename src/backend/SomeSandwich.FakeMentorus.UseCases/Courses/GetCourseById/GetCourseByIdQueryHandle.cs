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
///Handler for <see cref="GetCourseByIdQuery" />.
/// </summary>
public class GetCourseByIdQueryHandle : IRequestHandler<GetCourseByIdQuery, CourseDetailDto>
{
    private readonly IMapper mapper;
    private readonly IAppDbContext dbContext;
    private readonly IAccessService accessService;
    private readonly ILogger<GetCourseByIdQueryHandle> logger;

    /// <summary>
    ///Constructor.
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="dbContext"></param>
    /// <param name="accessService"></param>
    /// <param name="logger"></param>
    public GetCourseByIdQueryHandle(IAppDbContext dbContext, IMapper mapper,
        IAccessService accessService,
        ILogger<GetCourseByIdQueryHandle> logger)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
        this.accessService = accessService;
        this.logger = logger;
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
                .Include(c => c.Students).ThenInclude(cs => cs.Student)
                .Include(c => c.Teachers).ThenInclude(ct => ct.Teacher)
                .GetAsync(c => c.Id == request.CourseId, cancellationToken);

        logger.LogInformation("Course with id {CourseId} was found", request.CourseId);
        var result = mapper.Map<CourseDetailDto>(course);
        result.Requests = course.GradeCompositions.SelectMany(gc => gc.Grades)
            .Select(g => mapper.Map<RequestDto>(g.Request)).ToList();

        // TODO: Need url from frontend
        result.InviteLink = $"https://localhost:5001/invite/{course.ClassCode}";

        return result;
    }
}
