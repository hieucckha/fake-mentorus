using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;
using SomeSandwich.FakeMentorus.UseCases.Request.Common;

namespace SomeSandwich.FakeMentorus.UseCases.Request.CreateRequest;

/// <summary>
/// Handle for <see cref="CreateRequestCommand"/>
/// </summary>
public class CreateRequestCommandHandle : IRequestHandler<CreateRequestCommand, RequestDto>
{
    private readonly IAppDbContext dbContext;
    private readonly ILoggedUserAccessor loggedUserAccessor;
    private readonly UserManager<User> userManager;
    private readonly IMapper mapper;

    /// <summary>
    /// Constructor for <see cref="CreateRequestCommandHandle"/>
    /// </summary>
    /// <param name="dbContext"></param>
    /// <param name="loggedUserAccessor"></param>
    /// <param name="userManager"></param>
    /// <param name="mapper"></param>
    public CreateRequestCommandHandle(IAppDbContext dbContext, ILoggedUserAccessor loggedUserAccessor,
        UserManager<User> userManager, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.loggedUserAccessor = loggedUserAccessor;
        this.userManager = userManager;
        this.mapper = mapper;
    }

    /// <inheritdoc />
    public async Task<RequestDto> Handle(CreateRequestCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(loggedUserAccessor.GetCurrentUserId().ToString());
        if (user == null)
        {
            throw new NotFoundException("User not found");
        }

        var role = (await userManager.GetRolesAsync(user)).FirstOrDefault();
        if (role != null || role != "Student")
        {
            throw new ForbiddenException("Only students can create requests");
        }

        var requestEntity = new Domain.Request.Request
        {
            StudentId = user.Id,
            GradeId = request.GradeId,
            Reason = request.Reason,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        await dbContext.Requests.AddAsync(requestEntity, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        var courseId = await dbContext.Courses
            .Include(c => c.GradeCompositions)
            .ThenInclude(gc => gc.Grades
                .FirstOrDefault(g => g.Id == request.GradeId))
            .Select(c => c.Id)
            .FirstOrDefaultAsync(cancellationToken);

        var result = mapper.Map<RequestDto>(requestEntity);

        var aaa = await dbContext.StudentInfos
            .Include(si => si.Student)
            .ThenInclude(s => s.User)
            .Include(e => e.Course)
            .Where(si => si.CourseId == courseId)
            .Where(si => si.Student.User.Id == user.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (aaa == null)
        {
            result.StudentName = user.FullName;
        }

        result.StudentName = aaa!.Name;

        return result;
    }
}
