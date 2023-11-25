using SomeSandwich.FakeMentorus.Domain.Users;

namespace SomeSandwich.FakeMentorus.UseCases.Course.Common;

/// <summary>
///     Course DTO.
/// </summary>
public class CourseDto
{
    /// <summary>
    ///     Course ID.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    ///     Course name.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    ///     Course description.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    ///     Course start date.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    ///     Course end date.
    /// </summary>
    public DateTime UpdatedAt { get; set; }

    /// <summary>
    ///     Course students.
    /// </summary>
    public IList<User> Students { get; set; } = null!;

    /// <summary>
    ///     Course teachers.
    /// </summary>
    public IList<User> Teachers { get; set; } = null!;
}
