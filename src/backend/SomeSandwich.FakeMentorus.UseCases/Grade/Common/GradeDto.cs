namespace SomeSandwich.FakeMentorus.UseCases.Grade.Common;

public class GradeDto
{
    /// <summary>
    /// Grade id.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Grade Composition id.
    /// </summary>
    public int GradeCompositionId { get; set; }

    /// <summary>
    /// Student id.
    /// </summary>
    public int StudentId { get; set; }

    /// <summary>
    /// Student name.
    /// </summary>
    public string StudentName { get; set; } = string.Empty;

    /// <summary>
    /// Grade value.
    /// </summary>
    public float GradeValue { get; set; }
}
