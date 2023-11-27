using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Saritasa.Tools.Domain.Exceptions;
using Saritasa.Tools.EntityFrameworkCore;
using SomeSandwich.FakeMentorus.Domain.Course;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.AssignByCode;

/// <summary>
/// Handler for the <see cref="AssignByCodeCommand"/>.
/// </summary>
internal class AssignByCodeCommandHandle : IRequestHandler<AssignByCodeCommand>
{
    private readonly IAppDbContext dbContext;
    private readonly ILogger<AssignByCodeCommandHandle> logger;
    private readonly ILoggedUserAccessor loggedUserAccessor;
    private readonly UserManager<User> userManager;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="dbContext"></param>
    /// <param name="logger"></param>
    /// <param name="loggedUserAccessor"></param>
    /// <param name="userManager"></param>
    public AssignByCodeCommandHandle(IAppDbContext dbContext,
        ILogger<AssignByCodeCommandHandle> logger, ILoggedUserAccessor loggedUserAccessor,
        UserManager<User> userManager)
    {
        this.dbContext = dbContext;
        this.logger = logger;
        this.loggedUserAccessor = loggedUserAccessor;
        this.userManager = userManager;
    }

    /// <inheritdoc />
    public async Task Handle(AssignByCodeCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = loggedUserAccessor.GetCurrentUserId();
        var currentUser =
            await dbContext.Users.GetAsync(u => u.Id == currentUserId, cancellationToken);
        var userRole = (await userManager.GetRolesAsync(currentUser))
            .FirstOrDefault();

        var course = await dbContext.Courses
            .Include(c => c.Students)
            .Include(c => c.Teachers)
            .GetAsync(c => c.Id == request.CourseId, cancellationToken);

        logger.LogInformation(
            $"Assigning user with id {currentUserId} to course with id {request.CourseId}.");

        if (course == null)
        {
            logger.LogWarning("Course with id {CourseId} not found.", request.CourseId);
            throw new NotFoundException($"Course with id {request.CourseId} not found.");
        }

        if (course.InviteCode != request.InviteCode)
        {
            logger.LogWarning("Course with id {CourseId} has a different invite code.",
                request.CourseId);
            throw new DomainException("The invite code is not valid.");
        }

        switch (userRole)
        {
            case "Student" when course.Students.Any(s => s.Id == currentUserId):
                logger.LogWarning(
                    "Student with id {StudentId} already assigned to course with id {CourseId}.",
                    currentUserId, request.CourseId);
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
                    currentUserId, request.CourseId);
                throw new DomainException("You are already assigned to this course.");
            case "Teacher":
                dbContext.CourseTeachers.Add(new CourseTeacher
                {
                    CourseId = course.Id, TeacherId = currentUserId
                });
                break;
        }

        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation(
            $"Assigned user with id {currentUserId} to course with id {request.CourseId} success.");
    }
}
