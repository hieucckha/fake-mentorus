using AutoMapper;
using SomeSandwich.FakeMentorus.UseCases.Grade.Common;

namespace SomeSandwich.FakeMentorus.UseCases.Grade;

/// <summary>
/// Grade mapping profile.
/// </summary>
public class GradeMappingProfile : Profile
{
    /// <summary>
    /// Initializes a new instance of the <see cref="GradeMappingProfile"/> class.
    /// </summary>
    public GradeMappingProfile()
    {
        CreateMap<Domain.Grade.Grade, GradeDto>();
    }
}
