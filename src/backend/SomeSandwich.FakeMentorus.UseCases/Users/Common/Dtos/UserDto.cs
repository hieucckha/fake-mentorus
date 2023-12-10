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
    /// User role.
    /// </summary>
    public string? Role { get; set; }
}
