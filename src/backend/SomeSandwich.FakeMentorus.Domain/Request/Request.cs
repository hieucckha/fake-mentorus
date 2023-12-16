using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SomeSandwich.FakeMentorus.Domain.Users;

namespace SomeSandwich.FakeMentorus.Domain.Request;

/// <summary>
/// Request entity.
/// </summary>
public class Request
{
    /// <summary>
    /// Request id.
    /// </summary>
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    // /// <summary>
    // /// Course id.
    // /// </summary>
    // public int CourseId { get; set; }

    /// <summary>
    /// Grade id.
    /// </summary>
    public int GradeId { get; set; }

    /// <summary>
    /// Student id.
    /// </summary>
    public int StudentId { get; set; }

    /// <summary>
    /// Request detail.
    /// </summary>
    public string Reason { get; set; } = string.Empty;

    /// <summary>
    /// Request status.
    /// </summary>
    public RequestStatus Status { get; set; } = RequestStatus.Pending;

    // ---------------------------------------------------------------------------------------------

    /// <summary>
    /// Created at.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Updated at.
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // ---------------------------------------------------------------------------------------------

    // /// <summary>
    // /// Grade value.
    // /// </summary>
    // public virtual Course.Course Course { get; set; }

    /// <summary>
    /// Grade.
    /// </summary>
    public virtual Grade.Grade Grade { get; set; } = null!;

    /// <summary>
    /// Student.
    /// </summary>
    public virtual User Student { get; set; } = null!;
}
