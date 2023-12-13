namespace SomeSandwich.FakeMentorus.UseCases.Request.Common;

/// <summary>
///   Request dto.
/// </summary>
public class RequestDto
{
    /// <summary>
    /// Request id.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Course id.
    /// </summary>
    public int CourseId { get; set; }

    /// <summary>
    /// Student id.
    /// </summary>
    public int StudentId { get; set; }

    /// <summary>
    /// Student name.
    /// </summary>
    public string StudentName { get; set; } = string.Empty;

    /// <summary>
    /// Request detail.
    /// </summary>
    public string Reason { get; set; } = string.Empty;

    /// <summary>
    /// Created at.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Updated at.
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}
