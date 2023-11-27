using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Saritasa.Tools.Domain.Exceptions;
using Saritasa.Tools.EntityFrameworkCore;
using SomeSandwich.FakeMentorus.Domain.Course;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;
using SomeSandwich.FakeMentorus.UseCases.Courses.CreateInvitationLinkByEmail;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.AssignByToken;

/// <summary>
/// Handler for <see cref="AssignByTokenCommand" />.
/// </summary>
internal class AssignByTokenCommandHandle : IRequestHandler<AssignByTokenCommand>
{
    private readonly IMemoryCache memoryCache;
    private readonly ILogger<AssignByTokenCommandHandle> logger;
    private readonly ILoggedUserAccessor loggedUserAccessor;
    private readonly UserManager<User> userManager;
    private IAppDbContext dbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="memoryCache"></param>
    /// <param name="logger"></param>
    /// <param name="userManager"></param>
    /// <param name="dbContext"></param>
    /// <param name="loggedUserAccessor"></param>
    public AssignByTokenCommandHandle(IMemoryCache memoryCache,
        ILogger<AssignByTokenCommandHandle> logger, ILoggedUserAccessor loggedUserAccessor,
        UserManager<User> userManager, IAppDbContext dbContext)
    {
        this.memoryCache = memoryCache;
        this.logger = logger;
        this.loggedUserAccessor = loggedUserAccessor;
        this.userManager = userManager;
        this.dbContext = dbContext;
    }

    /// <inheritdoc />
    public async Task Handle(AssignByTokenCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = loggedUserAccessor.GetCurrentUserId();
        var user = await userManager.FindByIdAsync(currentUserId.ToString());

        logger.LogInformation("Assigning user with id {UserId} to course by token {Token}.",
            currentUserId, request.Token);

        memoryCache.TryGetValue(request.Token, out var cacheValue);

        if (cacheValue is null)
        {
            logger.LogWarning("Token {Token} not found", request.Token);
            throw new NotFoundException("Invitation link not valid");
        }

        var cacheInviteValue = (CacheInviteValue)cacheValue;

        if (cacheInviteValue.Email != user?.Email)
        {
            logger.LogWarning("Token {Token} not found", request.Token);
            throw new NotFoundException("Invitation link not valid");
        }

        var course = await dbContext.Courses
            .Include(c => c.Students)
            .Include(c => c.Teachers)
            .GetAsync(c => c.Id == cacheInviteValue.CourseId, cancellationToken);

        var role = (await userManager.GetRolesAsync(user)).FirstOrDefault();
        switch (role)
        {
            case "Student" when course.Students.Any(s => s.Id == currentUserId):
                logger.LogWarning(
                    "Student with id {StudentId} already assigned to course with id {CourseId}.",
                    currentUserId, cacheInviteValue.CourseId);
                throw new DomainException("You are already assigned to this course.");
            case "Student":
                dbContext.CourseStudents.Add(new CourseStudent
                {
                    CourseId = course.Id, StudentId = currentUserId
                });
                break;
            case "Teacher" when course.Teachers.Any(t => t.Id == currentUserId):
                logger.LogWarning(
                    "Teacher with id {TeacherId} already assigned to course with id {CourseId}.",
                    currentUserId, cacheInviteValue.CourseId);
                throw new DomainException("You are already assigned to this course.");
            case "Teacher":
                dbContext.CourseTeachers.Add(new CourseTeacher
                {
                    CourseId = course.Id, TeacherId = currentUserId
                });
                break;
        }

        memoryCache.Remove(request.Token);

        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("User with id {UserId} assigned to course with id {CourseId}.",
            currentUserId, cacheInviteValue.CourseId);
    }
}
