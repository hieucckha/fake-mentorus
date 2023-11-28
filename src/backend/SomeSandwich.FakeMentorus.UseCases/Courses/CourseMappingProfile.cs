using AutoMapper;
using SomeSandwich.FakeMentorus.Domain.Course;
using SomeSandwich.FakeMentorus.UseCases.Courses.Common;
using SomeSandwich.FakeMentorus.UseCases.Courses.GetCourseById;
using SomeSandwich.FakeMentorus.UseCases.Users.Common.Dtos;

namespace SomeSandwich.FakeMentorus.UseCases.Courses;

/// <summary>
///     Course mapping profile.
/// </summary>
public class CourseMappingProfile : Profile
{
    /// <summary>
    ///    Constructor.
    /// </summary>
    public CourseMappingProfile()
    {
        CreateMap<Course, CourseDto>()
            .AfterMap((src, des) =>
            {
                des.NumberOfStudents = src.Students.Count;
                des.NumberOfTeachers = src.Teachers.Count;
            });
        CreateMap<Course, CourseDetailDto>();

        CreateMap<CourseStudent, UserDto>().AfterMap((src, des) =>
        {
            des.Id = src.StudentId;
            des.FullName = src.Student.FullName;
        });
        CreateMap<CourseTeacher, UserDto>().AfterMap((src, des) =>
        {
            des.Id = src.TeacherId;
            des.FullName = src.Teacher.FullName;
        });
    }
}
