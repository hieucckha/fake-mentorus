using SomeSandwich.FakeMentorus.UseCases.Grade.Common;
using SomeSandwich.FakeMentorus.UseCases.GradeComposition.Common;
using SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.GetAllGradeByCourseId;

/// <summary>
/// 
/// </summary>
public class GetAllGradeByCourseIdResult
{
    required public int CourseId { get; set; }

    required public IReadOnlyList<GradeCompositionDto> GradeCompositionDtos { get; set; }

    public IReadOnlyList<GradeCell> StudentWithUserId { get; set; }

    public IReadOnlyList<GradeCell> StudentWithoutUserId { get; set; }

    public IReadOnlyList<UserDto> UserWithoutStudentId { get; set; }
}

public class GradeCell
{
    required public string StudnetId { get; set; }

    public int? UserId { get; set; }

    public IReadOnlyList<GradeDto> GradeDto { get; set; }
}
