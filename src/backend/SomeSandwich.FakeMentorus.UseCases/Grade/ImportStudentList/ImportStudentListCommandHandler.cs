using MediatR;
using Microsoft.Extensions.Logging;
using NPOI.XSSF.UserModel;
using Saritasa.Tools.Domain.Exceptions;
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
    public async Task Handle(ImportStudentListCommand command, CancellationToken cancellationToken)
    {
        using var workbook = new XSSFWorkbook(command.FileContent);
        var sheet = workbook.GetSheetAt(0);

        if (sheet is null)
        {
            throw new DomainException("The workbook is empty. Please try again");
        }

        // Header order: Student Id, Student Name
        var rowIndex = 1;
        var row = sheet.GetRow(rowIndex);
        var studentId = row.GetCell(0);
        var studentName = row.GetCell(1);
    }
}
