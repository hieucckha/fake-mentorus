using SomeSandwich.FakeMentorus.UseCases.Grade.Common;
using SomeSandwich.FakeMentorus.UseCases.GradeComposition.Common;
using SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.GetAllGradeByCourseId;

/// <summary>
/// Result of retrieving all grades for a specific course.
/// </summary>
public class GetAllGradeByCourseIdResult
{
    /// <summary>
    /// Id of course.
    /// </summary>
    required public int CourseId { get; set; }

    /// <summary>
    /// List of <see cref="GradeCompositionDtos"/> hold the information of grade composition (and order).
    /// </summary>
    required public IReadOnlyList<GradeCompositionDto> GradeCompositionDtos { get; set; }

    /// <summary>
    /// List of grade cell for student which have both StudentId and UserId.
    /// </summary>
    public IReadOnlyList<GradeCell> StudentWithUserId { get; set; } = new List<GradeCell>();

    /// <summary>
    /// List of grade cell for student which have StudentId but not have UserId.
    /// </summary>
    public IReadOnlyList<GradeCell> StudentWithoutUserId { get; set; } = new List<GradeCell>();

    /// <summary>
    /// List of grade cell for user (student) have in class but not mapping with any StudentId.
    /// </summary>
    public IReadOnlyList<UserDto> UserWithoutStudentId { get; set; } = new List<UserDto>();
}
