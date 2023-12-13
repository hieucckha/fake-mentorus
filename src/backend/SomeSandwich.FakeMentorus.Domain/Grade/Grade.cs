using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SomeSandwich.FakeMentorus.Domain.Users;

namespace SomeSandwich.FakeMentorus.Domain.Grade;

/// <summary>
/// Grade entity.
/// </summary>
public class Grade
{
    /// <summary>
    /// Grade id.
    /// </summary>
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    /// <summary>
    /// Grade Composition id.
    /// </summary>
    required public int GradeCompositionId { get; set; }

    /// <summary>
    /// Student id.
    /// </summary>
    required public int StudentId { get; set; }

    /// <summary>
    /// Grade value.
    /// </summary>
    required public float GradeValue { get; set; }

    // ---------------------------------------------------------------------------------------------

    /// <summary>
    /// Grade comment.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Updated at.
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // ---------------------------------------------------------------------------------------------

    /// <summary>
    /// Grade Composition.
    /// </summary>
    public virtual GradeComposition GradeComposition { get; set; } = null!;

    /// <summary>
    /// Student.
    /// </summary>
    public virtual User Student { get; set; } = null!;
}
