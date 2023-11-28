using MediatR;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using shortid.Configuration;

namespace SomeSandwich.FakeMentorus.UseCases.Courses.CreateInvitationLinkByEmail;

/// <summary>
///   Handler for <see cref="CreateInvitationLinkByEmailCommand" />.
/// </summary>
internal class CreateInvitationLinkByEmailCommandHandle :
    IRequestHandler<CreateInvitationLinkByEmailCommand, CreateInviteLinkResult>
{
    private readonly IMemoryCache memoryCache;
    private readonly ILogger<CreateInvitationLinkByEmailCommandHandle> logger;

    /// <summary>
    ///  Constructor.
    /// </summary>
    /// <param name="memoryCache"></param>
    /// <param name="logger"></param>
    public CreateInvitationLinkByEmailCommandHandle(IMemoryCache memoryCache,
        ILogger<CreateInvitationLinkByEmailCommandHandle> logger)
    {
        this.memoryCache = memoryCache;
        this.logger = logger;
    }

    /// <inheritdoc />
    public async Task<CreateInviteLinkResult> Handle(CreateInvitationLinkByEmailCommand request,
        CancellationToken cancellationToken)
    {
        logger.LogInformation(
            "Creating invitation link for course with id {CourseId} and email {Email}.",
            request.CourseId, request.Email);

        // TODO: this is backend link, we need frontend link

        var cacheKey = shortid.ShortId
            .Generate(new GenerationOptions(true, false, 10));
        var cacheValue = new CacheInviteValue(request.CourseId, request.Email);
        var cacheEntryOptions = new MemoryCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromMinutes(15));

        memoryCache.Set(cacheKey, cacheValue, cacheEntryOptions);
        logger.LogInformation("Invitation link created with {Token}.", cacheKey);

        return new CreateInviteLinkResult() { Token = cacheKey };
    }
}
