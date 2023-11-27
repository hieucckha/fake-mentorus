using MediatR;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.AssignByToken;

/// <summary>
/// Assigns a user to a course by token.
/// </summary>
public class AssignByTokenCommand : IRequest
{
    /// <summary>
    /// Token to assign a user to a course.
    /// </summary>
    public string Token { get; set; }
}
