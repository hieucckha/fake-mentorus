using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Saritasa.Tools.Domain.Exceptions;
using SomeSandwich.FakeMentorus.Domain.Request;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;
using SomeSandwich.FakeMentorus.UseCases.Comment.Common;

namespace SomeSandwich.FakeMentorus.UseCases.Comment.CreateComment;

/// <summary>
/// Handler for <see cref="CreateCommentCommand"/>.
/// </summary>
public class CreateCommentCommandHandle : IRequestHandler<CreateCommentCommand, CommentDto>
{
    private readonly IAppDbContext dbContext;
    private readonly ILoggedUserAccessor loggedUserAccessor;
    private readonly UserManager<User> userManager;
    private readonly IMapper mapper;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="dbContext"></param>
    /// <param name="loggedUserAccessor"></param>
    /// <param name="userManager"></param>
    /// <param name="mapper"></param>
    public CreateCommentCommandHandle(IAppDbContext dbContext, ILoggedUserAccessor loggedUserAccessor,
        UserManager<User> userManager, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.loggedUserAccessor = loggedUserAccessor;
        this.userManager = userManager;
        this.mapper = mapper;
    }

    /// <inheritdoc />
    public async Task<CommentDto> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(loggedUserAccessor.GetCurrentUserId().ToString());

        if (user == null)
        {
            throw new DomainException("User not found");
        }

        var role = (await userManager.GetRolesAsync(user)).FirstOrDefault();

        var comment = new CommentRequest()
        {
            RequestId = request.RequestId, UserId = user.Id, Comment = request.Comment, IsTeacher = role is "Teacher",
        };

        await dbContext.CommentRequests.AddAsync(comment, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        var result = mapper.Map<CommentDto>(comment);
        result.Name = user.FullName;
        return result;
    }
}
