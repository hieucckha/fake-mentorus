namespace SomeSandwich.FakeMentorus.UseCases.Courses.CreateInvitationLinkByEmail;

/// <summary>
/// Create invitation link by email command result.
/// </summary>
public class CreateInviteLinkResult
{
    /// <summary>
    /// Invitation token.
    /// </summary>
    public string Token { get; set; } = string.Empty;

}
