using AutoMapper;
using SomeSandwich.FakeMentorus.UseCases.Grade.Common;

namespace SomeSandwich.FakeMentorus.UseCases.Grade;

/// <summary>
/// Grade mapping profile.
/// </summary>
public class GradeMappingProfile: Profile
{
    public GradeMappingProfile()
    {
        CreateMap<Domain.Grade.Grade, GradeDto>()
            .AfterMap((src, des) => des.StudentName = $"{src.Student.FirstName} {src.Student.LastName}");
    }
}
