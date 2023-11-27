using MediatR;
using Microsoft.Extensions.Logging;
using shortid.Configuration;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.CreateCourse;

/// <summary>
/// Handler for <see cref="CreateCourseCommand"/>.
/// </summary>
internal class CreateCourseCommandHandle : IRequestHandler<CreateCourseCommand, int>
{
    private readonly ILogger<CreateCourseCommandHandle> logger;
    private readonly IAppDbContext dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="dbContext"></param>
    public CreateCourseCommandHandle(ILogger<CreateCourseCommandHandle> logger,
        IAppDbContext dbContext)
    {
        this.logger = logger;
        this.dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task<int> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Course creating...");
        var course = new Domain.Course.Course
        {
            Name = request.Name,
            Description = request
                .Description,
            InviteCode = shortid.ShortId.Generate(new GenerationOptions(true, false, 10))
        };

        var result = await dbContext.Courses.AddAsync(course, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation($"Course {course.Id} created.");

        return result.Entity.Id;
    }
}
