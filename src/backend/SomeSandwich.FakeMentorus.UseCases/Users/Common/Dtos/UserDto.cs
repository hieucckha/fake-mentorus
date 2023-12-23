namespace SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;

/// <summary>
/// User DTO.
/// </summary>
public class UserDto
{
    /// <summary>
    /// User identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Full name.
    /// </summary>
    required public string FullName { get; set; }

    /// <summary>
    /// Is user locked.
    /// </summary>
    public UserStatus Status { get; set; } = UserStatus.Active;

    /// <summary>
    /// Time when user was unlocked.
    /// </summary>
    required public DateTime? LockoutEnd { get; set; }

    /// <summary>
    /// User role.
    /// </summary>
    public string? Role { get; set; }
}

public enum UserStatus
{
    Active,
    Locked,
    Baned
}

public class UserCourseDto
{
    /// <summary>
    /// User identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Full name.
    /// </summary>
    required public string FullName { get; set; }

    /// <summary>
    /// User role.
    /// </summary>
    public string? Role { get; set; }
}
