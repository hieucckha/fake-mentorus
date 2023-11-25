using AutoMapper;
using SomeSandwich.FakeMentorus.Domain.Users;
using SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;
using SomeSandwich.FakeMentorus.UseCases.Users.GetUserById;

namespace SomeSandwich.FakeMentorus.UseCases.Users;

/// <summary>
/// User mapping profile.
/// </summary>
public class UserMappingProfile : Profile
{
    /// <summary>
    /// Constructor.
    /// </summary>
    public UserMappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<User, UserDetailsDto>();
    }
}
