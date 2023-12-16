using MediatR;
using Microsoft.Extensions.Logging;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.ImportStudentList;

/// <summary>
/// Handler for <see cref="ImportStudentListCommand"/>.
/// </summary>
internal class ImportStudentListCommandHandler : IRequestHandler<ImportStudentListCommand>
{
    private readonly ILogger<ImportStudentListCommandHandler> logger;
    private readonly IAppDbContext appDbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="appDbContext"></param>
    public ImportStudentListCommandHandler(ILogger<ImportStudentListCommandHandler> logger, IAppDbContext appDbContext)
    {
        this.logger = logger;
        this.appDbContext = appDbContext;
    }

    /// <inheritdoc />
    public async Task Handle(ImportStudentListCommand request, CancellationToken cancellationToken)
    {

    }
}
