using Microsoft.AspNetCore.Http;

namespace WebApi.Models
{
  public class UserImage
  {
    public string FileName { get; set; }
    public IFormFile FormFile { get; set; }
    public int UserId { get; set; }
  }
}