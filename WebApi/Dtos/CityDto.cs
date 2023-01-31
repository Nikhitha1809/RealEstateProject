using System.ComponentModel.DataAnnotations;
namespace WebApi.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(20, MinimumLength=2)]
        [RegularExpression(".*[a-zA-Z].*", ErrorMessage="Only nemerics are not allowed")]
        public string Name {get; set;}
        [Required]
        public string Country{get; set;}
    }
}