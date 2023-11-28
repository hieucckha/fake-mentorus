using SomeSandwich.FakeMentorus.UseCases.Grade.Common;
using SomeSandwich.FakeMentorus.UseCases.Request.Common;
using SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseById;

/// <summary>
///    Course detail DTO.
/// </summary>
public class CourseDetailDto
{
    /// <summary>
    ///    Course id.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    ///     Course name.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    ///     Course description.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    ///    Invite code for the course.
    /// </summary>
    public string? InviteCode { get; set; }

    /// <summary>
    ///     Course start date.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    ///     Course end date.
    /// </summary>
    public DateTime UpdatedAt { get; set; }

    /// <summary>
    ///    Number of students in the course.
    /// </summary>
    public int NumberOfStudents { get; set; }

    /// <summary>
    ///   List of student in the course.
    /// </summary>
    public ICollection<UserDto> Students { get; set; }

    /// <summary>
    ///  List of teachers in the course.
    /// </summary>
    public ICollection<UserDto> Teachers { get; set; }

    /// <summary>
    /// List of grade compositions in the course.
    /// </summary>
    public ICollection<GradeCompositionDto> GradeCompositions { get; set; }

    /// <summary>
    /// List of requests in the course.
    /// </summary>
    public ICollection<RequestDto> Requests { get; set; }
}