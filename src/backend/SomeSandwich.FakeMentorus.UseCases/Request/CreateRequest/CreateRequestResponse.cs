namespace SomeSandwich.FakeMentorus.UseCases.Request.CreateRequest;

/// <summary>
/// Response of the command to create a request of a student to a grade.
/// </summary>
public class CreateRequestResponse
{
    /// <summary>
    /// The id of the request.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// The id of the grade to request.
    /// </summary>
    public int GradeId { get; set; }

    /// <summary>
    /// Reason of the request.
    /// </summary>
    public string Reason { get; set; } = string.Empty;

    /// <summary>
    /// The id of the student who made the request.
    /// </summary>
    public int StudentId { get; set; }

    /// <summary>
    /// The name of the student who made the request.
    /// </summary>
    public string StudentName { get; set; } = string.Empty;

    /// <summary>
    /// The status of the request.
    /// </summary>
    public int Status { get; set; }

    /// <summary>
    /// The date when the request was created.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// The date when the request was updated.
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}
