using MediatR;
using Microsoft.Extensions.Logging;
using SomeSandwich.FakeMentorus.Infrastructure.Abstractions.Interfaces;

namespace SomeSandwich.FakeMentorus.UseCases.Grade.ImportStudentGrade;

/// <summary>
/// Handler for <see cref="ImportStudentGradeCommand"/>.
/// </summary>
internal class ImportStudentGradeCommandHandler : IRequestHandler<ImportStudentGradeCommand>
{
    private readonly ILogger<ImportStudentGradeCommandHandler> logger;
    private readonly IAppDbContext appDbContext;

    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="logger">Logger instance.</param>
    /// <param name="appDbContext">Database context instance.</param>
    public ImportStudentGradeCommandHandler(ILogger<ImportStudentGradeCommandHandler> logger, IAppDbContext appDbContext)
    {
        this.logger = logger;
        this.appDbContext = appDbContext;
    }

    /// <inheritdoc />
    public async Task Handle(ImportStudentGradeCommand command, CancellationToken cancellationToken)
    {
        var i = 0;
    }
}
