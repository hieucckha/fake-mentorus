using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Saritasa.Tools.EntityFrameworkCore;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;
using SomeSandwich.FakeMentorus.UseCases.Common.Service;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseById;

/// <summary>
///    Handler for <see cref="GetCourseByIdQuery" />.
/// </summary>
public class GetCourseByIdQueryHandle : IRequestHandler<GetCourseByIdQuery, CourseDetailDto>
{
    private readonly IMapper mapper;
    private readonly IAppDbContext dbContext;
    private readonly IAccessService accessService;
    private readonly ILogger<GetCourseByIdQueryHandle> logger;

    /// <summary>
    ///    Constructor.
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
            throw new UnauthorizedAccessException("You don't have access to this course.");
        }

        var course =
            await dbContext.Courses
                .Include(c => c.GradeCompositions)
                .Include(c => c.Requests)
                .Include(c => c.Students).ThenInclude(cs => cs.Student)
                .Include(c => c.Teachers).ThenInclude(ct => ct.Teacher)
                .GetAsync(c => c.Id == request.CourseId, cancellationToken);

        logger.LogInformation("Course with id {CourseId} was found", request.CourseId);
        var result = mapper.Map<CourseDetailDto>(course);

        return result;
    }
}
