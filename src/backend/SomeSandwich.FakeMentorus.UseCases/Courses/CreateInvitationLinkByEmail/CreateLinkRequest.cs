namespace SomeSandwich.FakeMentorus.UseCases.Courses.CreateInvitationLinkByEmail;

/// <summary>
/// Create invitation link by email command.
/// </summary>
public class CreateLinkRequest
{
    /// <summary>
    /// Email of user to invite.
    /// </summary>
    required public string Email { get; set; }
}
